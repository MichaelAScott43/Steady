const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    prompt: { type: String, trim: true, default: '' },
    promptVoice: { type: String, enum: ['TJ', 'Arlane'], default: 'TJ' },
    text: { type: String, required: true, trim: true },
    mood: { type: Number, min: 1, max: 5, default: null },
    aiReflection: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.JournalEntry || mongoose.model('JournalEntry', JournalEntrySchema);
