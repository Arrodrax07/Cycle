const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const { authMiddleware } = require('../middleware/auth');
const crypto = require('crypto');

// Create Booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { rideDate, slot, participants } = req.body;
    const userId = req.user.id;
    const numParticipants = Number(participants) || 1;

    // Check availability
    let slotRecord = await Slot.findOne({ date: rideDate, slot });
    if (!slotRecord) {
      slotRecord = new Slot({ date: rideDate, slot, totalSlots: 50, bookedSlots: 0 });
    }

    if (slotRecord.bookedSlots + numParticipants > slotRecord.totalSlots) {
      return res.status(400).json({ message: 'Slots Full.' });
    }

    slotRecord.bookedSlots += numParticipants;
    await slotRecord.save();

    const ticketId = 'TKT-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const booking = new Booking({
      userId,
      rideDate,
      slot,
      participants: numParticipants,
      ticketId
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Bookings
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel Booking
router.post('/cancel/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

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
