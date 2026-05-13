const mongoose = require('mongoose');

const SafetyPlanSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    trustedContacts: [
      {
        name: { type: String, trim: true },
        phone: { type: String, trim: true },
        relationship: { type: String, trim: true }
      }
    ],
    warningSigns: [{ type: String, trim: true }],
    copingStrategies: [{ type: String, trim: true }],
    reasons: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.models.SafetyPlan || mongoose.model('SafetyPlan', SafetyPlanSchema);
