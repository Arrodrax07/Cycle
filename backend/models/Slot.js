const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // e.g. "2023-11-24"
  slot: { type: String, required: true }, // "Friday Night" or "Saturday Night"
  totalSlots: { type: Number, default: 50 },
  bookedSlots: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Slot', SlotSchema);
