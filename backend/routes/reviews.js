const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authMiddleware } = require('../middleware/auth');

// Get all approved reviews
router.get('/', async (req, res) => {
  console.log('GET /api/reviews - Request received');
  try {
    const reviews = await Review.find({ status: 'Approved' })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    
    // Map to match frontend expected structure (userId -> user)
    const formattedReviews = reviews.map(r => {
      const obj = r.toObject();
      return {
        ...obj,
        user: obj.userId
      };
    });
    
    res.json(formattedReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit a review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const newReview = new Review({
      userId: req.user.id,
      rating,
      comment
    });

    await newReview.save();
    res.json({ message: 'Review submitted successfully', review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Admin Moderation Routes ---

// Get all reviews for admin moderation
router.get('/admin', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const reviews = await Review.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    // Format for frontend
    const formattedReviews = reviews.map(r => {
      const obj = r.toObject();
      return {
        ...obj,
        user: obj.userId
      };
    });
    
    res.json(formattedReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review status (Approve)
router.patch('/admin/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id, 
      { status: 'Approved' },
      { new: true }
    );
    res.json({ message: 'Review approved', review });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a review
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
