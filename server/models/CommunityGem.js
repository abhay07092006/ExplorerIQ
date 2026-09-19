import mongoose from 'mongoose';

const CommunityGemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  city: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true },
  avatar: { type: String },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: String, default: 'Just now' },
  description: { type: String, required: true },
  badgeColor: { type: String, default: 'bg-teal-500/10 text-teal-600 border-teal-200' }
}, {
  timestamps: true
});

export const CommunityGem = mongoose.model('CommunityGem', CommunityGemSchema);
