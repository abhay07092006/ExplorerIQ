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
  getCommunityGems,
  createCommunityGem,
  likeCommunityGem
} from '../controllers/gemController.js';

import {
  getHotelPricing,
  getMonumentPricing
} from '../controllers/pricingController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.makedirsSync(uploadDir, { recursive: true });
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
    version: 'v1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Monuments API
router.post('/monuments/identify', upload.single('image'), identifyMonument);
router.get('/monuments/samples', getSampleMonuments);
router.get('/monuments/:id', getMonumentById);
router.get('/monuments', getAllMonuments);

// Destinations & Places API
router.get('/destinations', getDestinations);
router.get('/destinations/:id', getDestinationById);
router.get('/places/nearby', getNearbyEateries);

// Community Gems API
router.get('/gems', getCommunityGems);
router.post('/gems', createCommunityGem);
router.post('/gems/:id/like', likeCommunityGem);

// Live Pricing & Verified Monument Fees API
router.get('/pricing/hotels', getHotelPricing);
router.get('/pricing/monuments', getMonumentPricing);

export default router;
