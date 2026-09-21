import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  homeCity: {
    type: String,
    default: 'New Delhi'
  },

  savedItineraries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary'
  }],

  bookmarkedPlaces: [{
    type: String
  }]
}, {
  timestamps: true
});

export const User =
  mongoose.models.User || mongoose.model('User', UserSchema);

export default User;