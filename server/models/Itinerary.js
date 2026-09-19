import mongoose from 'mongoose';

const ItinerarySlotSchema = new mongoose.Schema({
  id: String,
  slotIndex: Number,
  slotLabel: String,
  time: String,
  title: String,
  category: String,
  type: String,
  desc: String,
  transit: String,
  entryFee: String,
  numericFee: { type: Number, default: 0 },
  tip: String,
  isFood: { type: Boolean, default: false },
  location: String
}, { _id: false });

const DayPlanSchema = new mongoose.Schema({
  dayNumber: Number,
  dayTitle: String,
  slots: [ItinerarySlotSchema]
}, { _id: false });

const ItinerarySchema = new mongoose.Schema({
  userId: { type: String, default: null, index: true },
  destinationCity: { type: String, required: true, index: true },
  startDate: { type: String },
  endDate: { type: String },
  days: { type: Number, default: 1 },
  guests: { type: Number, default: 1 },
  travelerType: { type: String, default: 'Solo Explorer' },
  budget: { type: Number, required: true },
  breakdown: {
    accommodation: { type: Number, default: 0 },
    entryFees: { type: Number, default: 0 },
    transit: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    buffer: { type: Number, default: 0 }
  },
  dayPlan: [DayPlanSchema],
  bookingUrl: { type: String },
  isDeficit: { type: Boolean, default: false },
  deficitAmount: { type: Number, default: 0 },
  suggestions: [{
    id: String,
    title: String,
    description: String,
    savingsINR: Number
  }]
}, {
  timestamps: true
});

export const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', ItinerarySchema);
export default Itinerary;
