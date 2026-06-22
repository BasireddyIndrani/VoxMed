import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import consultationRoutes from './routes/consultationRoutes.js';

// Resolve directory paths in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and parsing middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/consultations', consultationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const geminiConfigured = !!process.env.GEMINI_API_KEY && 
                           process.env.GEMINI_API_KEY !== 'AIzaSyYourActualGeminiApiKeyGoesHere' && 
                           !process.env.GEMINI_API_KEY.startsWith('your_');

  const bhashiniConfigured = !!process.env.BHASHINI_API_KEY && 
                             process.env.BHASHINI_API_KEY !== 'your_bhashini_key_here' &&
                             !!process.env.BHASHINI_USER_ID && 
                             process.env.BHASHINI_USER_ID !== 'your_bhashini_user_id' &&
                             !!process.env.BHASHINI_APP_ID && 
                             process.env.BHASHINI_APP_ID !== 'your_bhashini_app_id';

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: global.useLocalFallback ? 'local-json-fallback' : 'mongodb-atlas',
    aiConnected: geminiConfigured,
    speechEngine: bhashiniConfigured ? 'Bhashini' : 'Browser Speech Recognition',
    translationEngine: 'Gemini'
  });
});

// Serve frontend in production (optional setup)
// For dev mode, the monorepo runs frontend on Vite and backend on Express
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({ error: 'Server error encountered', message: err.message });
});

// Initialize database and start server
const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 VoxMed Express server running on port ${PORT}`);
    console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health`);
    if (global.useLocalFallback) {
      console.log('📁 Local Database location: d:\\voxmed\\backend\\data\\db_fallback.json');
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n⚠️  Port ${PORT} is already in use!`);
      console.error(`   Another instance of VoxMed (or another server) is running on this port.`);
      console.error(`   You do not need to launch a new server if one is already active.\n`);
      process.exit(0);
    } else {
      console.error(`❌ Server start error: ${err.message}`);
      process.exit(1);
    }
  });
};

startServer();
