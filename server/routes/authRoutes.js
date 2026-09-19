import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  saveTrip,
  deleteTrip,
  toggleBookmark,
  recordScannedMonument
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/saved-trips', protect, saveTrip);
router.delete('/saved-trips/:tripId', protect, deleteTrip);
router.post('/bookmarks', protect, toggleBookmark);
router.post('/scanned-monuments', protect, recordScannedMonument);

export default router;
