const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');
const {
  getAllUsers,
  deleteUser,
  getAllJobs,
  getAllApplications
} = require('../controllers/adminController');

router.get('/admin/users', verifyToken, verifyRole('admin'), getAllUsers);
router.delete('/admin/users/:userId', verifyToken, verifyRole('admin'), deleteUser);
router.get('/admin/jobs', verifyToken, verifyRole('admin'), getAllJobs);
router.get('/admin/applications', verifyToken, verifyRole('admin'), getAllApplications);

module.exports = router;
