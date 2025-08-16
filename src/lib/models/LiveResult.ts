import mongoose from 'mongoose';

const LiveResultSchema = new mongoose.Schema({
  marketSlug: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
  extra: { type: String },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

LiveResultSchema.index({ marketSlug: 1, label: 1 });

export default mongoose.models.LiveResult || mongoose.model('LiveResult', LiveResultSchema);
