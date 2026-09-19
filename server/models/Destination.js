import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  zone: { type: String, required: true },
  coordinates: {
    type: [Number], // [lat, lng]
    required: true
  },
  tagline: { type: String },
  heroImage: { type: String, required: true },
  bestTimeToVisit: { type: String },
  bestDuration: { type: String },
  climate: { type: String },
  overview: { type: String },
  localFoodSpecialties: [{
    name: String,
    desc: String,
    place: String,
    image: String
  }],
  places: [{
    id: String,
    name: String,
    category: String,
    coordinates: [Number],
    image: String,
    timing: String,
    fee: String,
    shortDesc: String,
    tip: String
  }]
}, {
  timestamps: true
});

export const Destination = mongoose.model('Destination', DestinationSchema);
