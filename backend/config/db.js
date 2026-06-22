import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

global.useLocalFallback = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("MONGODB_URI =", process.env.MONGODB_URI);
  if (!uri) {
    console.warn('⚠️ MONGODB_URI is not set in environment variables.');
    console.warn('📁 VoxMed will run using local JSON database fallback.');
    global.useLocalFallback = true;
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log('🔌 MongoDB Connected Successfully!');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('📁 Falling back to local JSON database storage.');
    global.useLocalFallback = true;
  }
};
