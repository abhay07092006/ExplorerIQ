import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SavedTripSchema = new mongoose.Schema({
  tripId: { type: String, required: true },
  destination: { type: String, required: true },
  cityName: { type: String },
  durationDays: { type: Number, default: 3 },
  guests: { type: Number, default: 2 },
  totalBudget: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  currencySymbol: { type: String, default: '₹' },
  grandTotal: { type: Number, required: true },
  isDeficit: { type: Boolean, default: false },
  deficitAmount: { type: Number, default: 0 },
  hotel: {
    name: String,
    nightlyRate: Number,
    totalStayCost: Number,
    tier: String
  },
  schedule: { type: Array, default: [] },
  breakdown: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

const BookmarkedPlaceSchema = new mongoose.Schema({
  placeId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, default: 'heritage' },
  city: { type: String },
  state: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  image: { type: String },
  description: { type: String },
  openingHours: { type: String },
  addedAt: { type: Date, default: Date.now }
});

const ScannedMonumentSchema = new mongoose.Schema({
  monumentId: { type: String },
  name: { type: String, required: true },
  confidence: { type: Number, default: 0.95 },
  location: { type: String },
  state: { type: String },
  image: { type: String },
  scannedAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true,
    maxlength: 60
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  avatarUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  bio: {
    type: String,
    default: 'Passionate explorer uncovering the architectural wonders and rich cultural tapestries of India.',
    maxlength: 300
  },
  homeCity: {
    type: String,
    default: 'New Delhi'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  savedTrips: [SavedTripSchema],
  bookmarkedPlaces: [BookmarkedPlaceSchema],
  contributedReviews: [
    {
      reviewId: String,
      gemId: String,
      gemTitle: String,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  scannedMonuments: [ScannedMonumentSchema]
}, {
  timestamps: true
});

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
