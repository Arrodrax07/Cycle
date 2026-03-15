const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const Slot = require('../models/Slot');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all bookings
router.get('/bookings', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalRiders = await User.countDocuments({ role: 'user' });
    const upcomingBookings = await Booking.countDocuments({ status: 'Booked' });
    const slots = await Slot.find();

    res.json({
      totalRiders,
      upcomingRides: upcomingBookings,
      slotsAvailability: slots
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel any booking
router.post('/bookings/cancel/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'Already cancelled' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    // Free up slot
    const slotRecord = await Slot.findOne({ date: booking.rideDate, slot: booking.slot });
    if (slotRecord) {
      slotRecord.bookedSlots = Math.max(0, slotRecord.bookedSlots - booking.participants);
      await slotRecord.save();
    }

    res.json({ message: 'Cancelled successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
