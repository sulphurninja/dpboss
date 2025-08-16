import mongoose from 'mongoose';

const DayDataSchema = new mongoose.Schema({
  triple: { type: String, default: '' },
  pair: { type: String, default: '' },
  isR: { type: Boolean, default: false }
}, { _id: false });

const PanelWeekSchema = new mongoose.Schema({
  marketSlug: { type: String, required: true },
  dateLabel: { type: String, required: true }, // innerHTML with <br> tags
  mon: DayDataSchema,
  tue: DayDataSchema,
  wed: DayDataSchema,
  thu: DayDataSchema,
  fri: DayDataSchema,
  sat: DayDataSchema,
  sun: DayDataSchema
}, {
  timestamps: true
});

PanelWeekSchema.index({ marketSlug: 1 });

export default mongoose.models.PanelWeek || mongoose.model('PanelWeek', PanelWeekSchema);
