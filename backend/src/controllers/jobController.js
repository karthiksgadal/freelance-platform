const Job = require('../models/Job');

// Create a new job (Client only)
const createJob = async (req, res) => {
  const { title, description, budget } = req.body;
  const clientId = req.user.id; // From token

  try {
    const job = new Job({
      title,
      description,
      budget,
      clientId
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("clientId", "name email");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
   
};
