import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  visitDate: { type: String },
  travelerType: { type: String, enum: ['Solo', 'Couple', 'Family', 'Friends'], default: 'Solo' },
  verifiedTraveler: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const CommunityGemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  city: { type: String, required: true, index: true },
  title: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true },
  avatar: { type: String },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: String, default: 'Just now' },
  description: { type: String, required: true },
  badgeColor: { type: String, default: 'bg-teal-500/10 text-teal-600 border-teal-200' },
  averageRating: { type: Number, default: 4.8 },
  totalReviews: { type: Number, default: 1 },
  reviews: [ReviewSchema]
}, {
  timestamps: true
});

export const CommunityGem = mongoose.model('CommunityGem', CommunityGemSchema);
