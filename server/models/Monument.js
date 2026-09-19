import mongoose from 'mongoose';

const MonumentSchema = new mongoose.Schema({
  id: { type: String, index: true },
  name: { type: String, required: true, index: true },
  hindiName: { type: String },
  city: { type: String, required: true, index: true },
  state: { type: String, required: true },
  zone: { type: String },
  country: { type: String, default: 'India' },
  category: { type: String, default: 'heritage' },
  description: { type: String },
  historicalEra: { type: String },
  commissionedBy: { type: String },
  architect: { type: String },
  constructionEra: { type: String },
  unescoStatus: { type: String },
  imageUrl: { type: String },
  primaryImage: { type: String },
  sampleThumb: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  asiFee: {
    indian: { type: Number, default: 50 },
    foreigner: { type: Number, default: 600 }
  },
  ticketPricing: {
    indian: { type: String, default: '₹50' },
    foreigner: { type: String, default: '₹600' },
    childrenUnder15: { type: String, default: 'Free' }
  },
  openingHours: { type: String, default: '09:00 AM - 05:30 PM' },
  closedOn: { type: String, default: 'Open Daily' },
  bestTimeToVisit: { type: String },
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

// Middleware to sync imageUrl and primaryImage, and ticketPricing with asiFee
MonumentSchema.pre('save', function (next) {
  if (!this.imageUrl && this.primaryImage) {
    this.imageUrl = this.primaryImage;
  }
  if (!this.primaryImage && this.imageUrl) {
    this.primaryImage = this.imageUrl;
  }
  if (this.asiFee?.indian && !this.ticketPricing?.indian) {
    this.ticketPricing = {
      ...this.ticketPricing,
      indian: `₹${this.asiFee.indian}`,
      foreigner: `₹${this.asiFee.foreigner || 600}`
    };
  }
  next();
});

export const Monument = mongoose.models.Monument || mongoose.model('Monument', MonumentSchema);
export default Monument;
