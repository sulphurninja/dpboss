import mongoose from 'mongoose';

const MarketSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  priority: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  schedule: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.Market || mongoose.model('Market', MarketSchema);
