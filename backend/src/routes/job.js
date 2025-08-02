const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');
const { getAllJobs } = require('../controllers/jobController');
const verifyToken = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');
const { getClientJobs } = require('../controllers/jobController'); // <-- ADD this

router.post('/jobs', verifyToken, verifyRole('client'), createJob);
router.get('/jobs', getAllJobs);
router.get('/client/jobs', verifyToken, verifyRole('client'), getClientJobs); // <-- ADD this

module.exports = router;

 
