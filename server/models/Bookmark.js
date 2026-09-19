import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  placeId: {
    type: String,
    required: true
  },
  placeName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'heritage'
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  coordinates: {
    lat: { type: Number },
    lon: { type: Number }
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  openingHours: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

export default Bookmark;
