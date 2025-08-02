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

// Get all jobs (for freelancers)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find(); // Remove filter!
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};



const getClientJobs = async (req, res) => {
  try {
    const clientId = req.user.id;
    const jobs = await Job.find({ clientId }); // ✅ correct field
    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error fetching client jobs:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createJob,
  getAllJobs,
  getClientJobs
};
