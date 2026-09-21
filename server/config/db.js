import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/exploreriq';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000 // Fast fail if no local mongo running
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (_error) {
    console.warn(`[MongoDB] Warning: Could not connect to MongoDB at ${uri}.`);
    console.warn(`[MongoDB] Operating in in-memory memory-store mode using verified seeded cache.`);
    return false;
  }
};
