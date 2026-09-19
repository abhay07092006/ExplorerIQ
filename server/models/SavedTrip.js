import mongoose from 'mongoose';

const SavedTripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinationCity: {
    type: String,
    required: true
  },
  budget: {
    totalBudget: Number,
    currency: { type: String, default: 'INR' },
    currencySymbol: { type: String, default: '₹' },
    grandTotal: Number,
    isDeficit: { type: Boolean, default: false },
    deficitAmount: { type: Number, default: 0 }
  },
  dayPlan: {
    type: Array, // Day-by-day 7-slot itinerary JSON
    default: []
  },
  hotel: {
    name: String,
    nightlyRate: Number,
    totalStayCost: Number,
    tier: String
  },
  guests: {
    type: Number,
    default: 2
  },
  durationDays: {
    type: Number,
    default: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SavedTrip = mongoose.model('SavedTrip', SavedTripSchema);

export default SavedTrip;
