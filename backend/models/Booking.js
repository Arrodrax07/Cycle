const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rideDate: { type: String, required: true }, // e.g., "2023-11-24"
  slot: { type: String, required: true }, // e.g., "Friday Night" or "Saturday Night"
  ticketId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Booked', 'Cancelled'], default: 'Booked' },
  participants: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
