import mongoose from 'mongoose';

const MonumentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, index: true },
  hindiName: { type: String },
  city: { type: String, required: true, index: true },
  state: { type: String, required: true },
  zone: { type: String },
  country: { type: String, default: 'India' },
  unescoStatus: { type: String },
  primaryImage: { type: String, required: true },
  sampleThumb: { type: String },
  commissionedBy: { type: String },
  architect: { type: String },
  constructionEra: { type: String },
  material: { type: String },
  architecturalStyle: { type: String },
  dimensions: { type: String },
  openingHours: { type: String },
  closedOn: { type: String },
  bestTimeToVisit: { type: String },
  ticketPricing: {
    indian: { type: String },
    foreigner: { type: String },
    childrenUnder15: { type: String }
  },
  keyHighlights: [{ type: String }],
  legendsAndFacts: { type: String },
  audioGuideTranscript: { type: String },
  nearbyFood: [{
    name: String,
    cuisine: String,
    distance: String,
    specialty: String
  }],
  nearbyAttractions: [{
    name: String,
    distance: String,
    type: { type: String }
  }],
  visualKeywords: [{ type: String }]
}, {
  timestamps: true
});

export const Monument = mongoose.model('Monument', MonumentSchema);
