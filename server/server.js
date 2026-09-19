import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import { seedDatabase } from './scripts/seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1', apiRoutes);

// Root Index
app.get('/', (req, res) => {
  res.json({
    name: 'ExplorerIQ API Backend',
    docs: '/api/v1/health',
    endpoints: [
      'POST /api/v1/monuments/identify',
      'GET  /api/v1/monuments/samples',
      'GET  /api/v1/monuments/:id',
      'GET  /api/v1/destinations',
      'GET  /api/v1/places/nearby?lat={lat}&lng={lng}',
      'GET  /api/v1/gems'
    ]
  });
});

// Startup & Seed
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`[ExplorerIQ Server] Running at http://localhost:${PORT}`);
    console.log(`[ExplorerIQ Server] API Base: http://localhost:${PORT}/api/v1`);
  });
};

startServer();
