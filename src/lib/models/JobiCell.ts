import mongoose from 'mongoose';

const JodiCellSchema = new mongoose.Schema({
  marketSlug: { type: String, required: true },
  row: { type: Number, required: true },
  col: { type: Number, required: true },
  raw: { type: String, required: true }, // innerHTML string
  isR: { type: Boolean, default: false }
}, {
  timestamps: true
});

JodiCellSchema.index({ marketSlug: 1, row: 1, col: 1 });

export default mongoose.models.JodiCell || mongoose.model('JodiCell', JodiCellSchema);
