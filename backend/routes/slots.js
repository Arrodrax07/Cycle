const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Get slot availability
router.get('/available', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
