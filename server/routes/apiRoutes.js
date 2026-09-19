import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import {
  identifyMonument,
  getMonumentById,
  getSampleMonuments,
  getAllMonuments
} from '../controllers/monumentController.js';

import {
  getDestinations,
  getDestinationById,
  getNearbyEateries
} from '../controllers/destinationController.js';

import {
  getGems,
  createGem,
  upvoteGem
} from '../controllers/gemsController.js';

import {
  addGemReview
} from '../controllers/gemController.js';

import {
  getHotelPricing,
  getMonumentPricing
} from '../controllers/pricingController.js';

import {
  generateItinerary,
  saveItinerary,
  getItineraryById
} from '../controllers/plannerController.js';

import {
  calculateRoute
} from '../controllers/routeController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'ExplorerIQ REST API Engine',
    version: 'v2.0.0',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 1. SMART PLANNER API
// ==========================================
router.post('/planner/generate', generateItinerary);
router.post('/planner/save', saveItinerary);
router.get('/planner/itineraries/:id', getItineraryById);

// ==========================================
// 2. ROUTE PLANNER & TRANSIT API
// ==========================================
router.post('/route/calculate', calculateRoute);

// ==========================================
// 3. COMMUNITY HIDDEN GEMS API
// ==========================================
router.get('/gems', getGems);
router.post('/gems', createGem);
router.post('/gems/create', createGem);
router.post('/gems/:id/upvote', upvoteGem);
router.post('/gems/:id/like', upvoteGem);
router.post('/gems/:id/reviews', addGemReview);

// ==========================================
// 4. MONUMENTS & AI RECOGNITION API
// ==========================================
router.post('/monuments/identify', upload.single('image'), identifyMonument);
router.get('/monuments/samples', getSampleMonuments);
router.get('/monuments/:id', getMonumentById);
router.get('/monuments', getAllMonuments);

// ==========================================
// 5. DESTINATIONS & PRICING API
// ==========================================
router.get('/destinations', getDestinations);
router.get('/destinations/:id', getDestinationById);
router.get('/places/nearby', getNearbyEateries);
router.get('/pricing/hotels', getHotelPricing);
router.get('/pricing/monuments', getMonumentPricing);

export default router;
