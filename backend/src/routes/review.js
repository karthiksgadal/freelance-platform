const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');
const { leaveReview, getFreelancerReviews } = require('../controllers/reviewController');

// Client leaves review
router.post('/reviews', verifyToken, verifyRole('client'), leaveReview);

// Anyone can view freelancer reviews
router.get('/reviews/:freelancerId', getFreelancerReviews);

module.exports = router;
