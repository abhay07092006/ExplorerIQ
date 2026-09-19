import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';

// In-Memory user store when MongoDB is not running locally
export const inMemoryUsers = new Map();

// Seed initial demo user into in-memory store
const seedDemoUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Traveler123!', salt);
  inMemoryUsers.set('aarav.sharma@exploreriq.com', {
    _id: 'demo-traveler-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@exploreriq.com',
    password: hashedPassword,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bio: 'Heritage enthusiast exploring UNESCO world heritage landmarks and ancient stepwells.',
    homeCity: 'Jaipur, Rajasthan',
    joinedDate: new Date(),
    savedTrips: [],
    bookmarkedPlaces: [],
    contributedReviews: [],
    scannedMonuments: [],
    async matchPassword(entered) {
      return await bcrypt.compare(entered, this.password);
    }
  });
};
seedDemoUser();

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Helper: Generate JWT token
const signToken = (id) => {
  const secret = process.env.JWT_SECRET || 'explorer_iq_super_secret_jwt_key_2026';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, homeCity } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isMongoConnected()) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const user = await User.create({
        name,
        email: normalizedEmail,
        password,
        homeCity: homeCity || 'New Delhi'
      });

      const token = signToken(user._id);
      user.password = undefined;

      return res.status(201).json({
        success: true,
        token,
        user
      });
    } else {
      // In-Memory Mode
      if (inMemoryUsers.has(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userId = `user-${Date.now()}`;

      const userObj = {
        _id: userId,
        name,
        email: normalizedEmail,
        password: hashedPassword,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        bio: 'Passionate explorer uncovering the architectural wonders of India.',
        homeCity: homeCity || 'New Delhi',
        joinedDate: new Date(),
        savedTrips: [],
        bookmarkedPlaces: [],
        contributedReviews: [],
        scannedMonuments: [],
        async matchPassword(entered) {
          return await bcrypt.compare(entered, this.password);
        }
      };

      inMemoryUsers.set(normalizedEmail, userObj);

      const token = signToken(userId);
      const safeUser = { ...userObj };
      delete safeUser.password;

      return res.status(201).json({
        success: true,
        token,
        user: safeUser
      });
    }
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error during registration.'
    });
  }
};

/**
 * @route   POST /api/v1/auth/login
 * @desc    Log in with email & password
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (isMongoConnected()) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const token = signToken(user._id);
      user.password = undefined;

      return res.json({
        success: true,
        token,
        user
      });
    } else {
      // In-Memory Mode
      const user = inMemoryUsers.get(normalizedEmail);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const token = signToken(user._id);
      const safeUser = { ...user };
      delete safeUser.password;

      return res.json({
        success: true,
        token,
        user: safeUser
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error during login.'
    });
  }
};

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset instructions
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let userExists = false;

    if (isMongoConnected()) {
      const user = await User.findOne({ email: normalizedEmail });
      userExists = !!user;
    } else {
      userExists = inMemoryUsers.has(normalizedEmail);
    }

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address.'
      });
    }

    res.json({
      success: true,
      message: 'Password reset link has been dispatched to your email address.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request.'
    });
  }
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get currently logged-in user profile
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.'
    });
  }
};

/**
 * @route   PUT /api/v1/auth/profile
 * @desc    Update user profile details
 * @access  Private
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, homeCity, avatarUrl } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (homeCity) user.homeCity = homeCity;
    if (avatarUrl) user.avatarUrl = avatarUrl;

    if (isMongoConnected()) {
      await user.save();
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update profile.'
    });
  }
};

/**
 * @route   POST /api/v1/auth/saved-trips
 * @desc    Save a trip plan to user profile
 * @access  Private
 */
export const saveTrip = async (req, res) => {
  try {
    const tripData = req.body;
    if (!tripData || !tripData.destination) {
      return res.status(400).json({
        success: false,
        message: 'Trip destination and details are required.'
      });
    }

    const user = req.user;
    const tripId = tripData.tripId || `trip-${Date.now()}`;
    const newTrip = { ...tripData, tripId, createdAt: new Date() };

    if (!user.savedTrips) user.savedTrips = [];
    const existingIndex = user.savedTrips.findIndex(t => t.tripId === tripId);
    if (existingIndex >= 0) {
      user.savedTrips[existingIndex] = newTrip;
    } else {
      user.savedTrips.unshift(newTrip);
    }

    if (isMongoConnected()) {
      await user.save();
    }

    res.status(201).json({
      success: true,
      savedTrips: user.savedTrips,
      trip: newTrip
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to save itinerary.'
    });
  }
};

/**
 * @route   DELETE /api/v1/auth/saved-trips/:tripId
 * @desc    Delete a saved trip plan
 * @access  Private
 */
export const deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const user = req.user;

    user.savedTrips = (user.savedTrips || []).filter(t => t.tripId !== tripId);
    if (isMongoConnected()) {
      await user.save();
    }

    res.json({
      success: true,
      savedTrips: user.savedTrips
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete saved trip.'
    });
  }
};

/**
 * @route   POST /api/v1/auth/bookmarks
 * @desc    Toggle place bookmark
 * @access  Private
 */
export const toggleBookmark = async (req, res) => {
  try {
    const place = req.body;
    if (!place || !place.placeId) {
      return res.status(400).json({
        success: false,
        message: 'Valid placeId is required.'
      });
    }

    const user = req.user;
    if (!user.bookmarkedPlaces) user.bookmarkedPlaces = [];
    const existingIndex = user.bookmarkedPlaces.findIndex(b => b.placeId === place.placeId);

    let isBookmarked = false;
    if (existingIndex >= 0) {
      user.bookmarkedPlaces.splice(existingIndex, 1);
      isBookmarked = false;
    } else {
      user.bookmarkedPlaces.unshift({ ...place, addedAt: new Date() });
      isBookmarked = true;
    }

    if (isMongoConnected()) {
      await user.save();
    }

    res.json({
      success: true,
      isBookmarked,
      bookmarkedPlaces: user.bookmarkedPlaces
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update bookmarks.'
    });
  }
};

/**
 * @route   POST /api/v1/auth/scanned-monuments
 * @desc    Record AI monument scan to history
 * @access  Private
 */
export const recordScannedMonument = async (req, res) => {
  try {
    const scanData = req.body;
    if (!scanData || !scanData.name) {
      return res.status(400).json({
        success: false,
        message: 'Monument name is required.'
      });
    }

    const user = req.user;
    if (!user.scannedMonuments) user.scannedMonuments = [];
    user.scannedMonuments.unshift({ ...scanData, scannedAt: new Date() });
    if (user.scannedMonuments.length > 50) {
      user.scannedMonuments = user.scannedMonuments.slice(0, 50);
    }

    if (isMongoConnected()) {
      await user.save();
    }

    res.status(201).json({
      success: true,
      scannedMonuments: user.scannedMonuments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record scanned monument.'
    });
  }
};
