import mongoose from 'mongoose';

const HiddenGemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  city: { type: String, trim: true },
  category: { 
    type: String, 
    enum: ['Heritage & Architecture', 'Nature & Views', 'Spiritual & Sacred', 'Culinary & Night Food', 'Artisan & Crafts', 'Hidden Corridors', 'General'],
    default: 'General'
  },
  description: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  userImage: { type: String }, // Base64 string or image URL
  image: { type: String },     // Compatibility alias
  upvotes: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }, // Compatibility alias
  submittedBy: { type: String, default: 'Community Explorer' },
  author: { type: String, default: 'Community Explorer' }, // Compatibility alias
  avatar: { type: String },
  badgeColor: { type: String, default: 'bg-teal-500/10 text-teal-600 border-teal-200' },
  reviews: [{
    author: String,
    rating: Number,
    comment: String,
    visitDate: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Pre-save synchronization for compatibility aliases
HiddenGemSchema.pre('save', function (next) {
  if (!this.city && this.location) {
    this.city = this.location.split(',')[0].trim();
  }
  if (!this.userImage && this.image) {
    this.userImage = this.image;
  }
  if (!this.image && this.userImage) {
    this.image = this.userImage;
  }
  if (this.upvotes !== undefined && this.likes === 0) {
    this.likes = this.upvotes;
  }
  if (this.likes !== undefined && this.upvotes === 0) {
    this.upvotes = this.likes;
  }
  if (!this.submittedBy && this.author) {
    this.submittedBy = this.author;
  }
  if (!this.author && this.submittedBy) {
    this.author = this.submittedBy;
  }
  next();
});

export const HiddenGem = mongoose.models.HiddenGem || mongoose.model('HiddenGem', HiddenGemSchema);
export default HiddenGem;
