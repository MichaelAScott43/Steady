const mongoose = require('mongoose');

const MoodLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    mood: { type: Number, required: true, min: 1, max: 5 },
    note: { type: String, trim: true, default: '' },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.models.MoodLog || mongoose.model('MoodLog', MoodLogSchema);
