import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { inMemoryUsers } from '../controllers/authController.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this resource. Please log in.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'explorer_iq_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, secret);

    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(decoded.id);
    } else {
      // Find in in-memory users store
      for (const u of inMemoryUsers.values()) {
        if (u._id === decoded.id) {
          user = u;
          break;
        }
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token.'
    });
  }
};
