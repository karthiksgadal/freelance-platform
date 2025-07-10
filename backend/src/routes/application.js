const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');
const { applyToJob } = require('../controllers/applicationController');
const { getFreelancerApplications } = require('../controllers/applicationController');
const { getClientJobApplications } = require('../controllers/applicationController');
const { getApplicationsForJob } = require('../controllers/applicationController');
const { updateApplicationStatus } = require('../controllers/applicationController');



router.post('/jobs/:jobId/apply', verifyToken, verifyRole('freelancer'), applyToJob);
router.get('/my-applications', verifyToken, verifyRole('freelancer'), getFreelancerApplications);
router.get('/client-applications', verifyToken, verifyRole('client'), getClientJobApplications);


// Get all applications for a specific job (Client only)
router.get('/jobs/:jobId/applications', verifyToken, verifyRole('client'), getApplicationsForJob);

// PATCH /api/applications/:applicationId/status
router.patch('/applications/:applicationId/status', verifyToken, verifyRole('client'), updateApplicationStatus);




module.exports = router;
