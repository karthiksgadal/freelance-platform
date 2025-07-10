const JobApplication = require('../models/JobApplication');

const applyToJob = async (req, res) => {
const { coverLetter } = req.body;
const jobId = req.params.jobId;

  const freelancerId = req.user.id; // comes from token

  try {
    const existingApplication = await JobApplication.findOne({ jobId, freelancerId });
    if (existingApplication) {
      return res.status(400).json({ error: "You have already applied to this job." });
    }

    const application = new JobApplication({
      jobId,
      freelancerId,
      coverLetter
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Job = require('../models/Job');

const getFreelancerApplications = async (req, res) => {
  const freelancerId = req.user.id;

  try {
    const applications = await JobApplication.find({ freelancerId })
      .populate('jobId', 'title description budget createdAt');

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getClientJobApplications = async (req, res) => {
  const clientId = req.user.id;

  try {
    // Find jobs created by this client
    const jobs = await Job.find({ clientId }).select('_id');

    const jobIds = jobs.map(job => job._id);

    // Find applications to these jobs
    const applications = await JobApplication.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title budget')
      .populate('freelancerId', 'name email');

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getApplicationsForJob = async (req, res) => {
  const { jobId } = req.params;
  const clientId = req.user.id; // from token

  try {
    // Check if the job belongs to this client
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.clientId.toString() !== clientId) {
      return res.status(403).json({ error: "Access denied. Not your job." });
    }

    const applications = await JobApplication.find({ jobId })
      .populate("freelancerId", "name email");

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body; // accepted or rejected
  const clientId = req.user.id;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const application = await JobApplication.findById(applicationId).populate('jobId');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Ensure the job belongs to the client
    if (application.jobId.clientId.toString() !== clientId) {
      return res.status(403).json({ error: 'You are not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Application status updated', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {
  applyToJob,
getFreelancerApplications,
getClientJobApplications,
getApplicationsForJob,
updateApplicationStatus

};
