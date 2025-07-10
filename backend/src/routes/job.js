const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');
const { getAllJobs } = require('../controllers/jobController');
const verifyToken = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');

router.post('/jobs', verifyToken, verifyRole('client'), createJob);
router.get('/jobs', getAllJobs);

module.exports = router;
