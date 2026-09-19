import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
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

// Security & Logging Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));
app.use(morgan('dev'));

// CORS Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body Parsing Middlewares
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes: Mount both /api and /api/v1
app.use('/api/v1', apiRoutes);
app.use('/api', apiRoutes);

// Root Index & Health Summary
app.get('/', (req, res) => {
  res.json({
    name: 'ExplorerIQ Production REST API Engine',
    version: '2.0.0',
    status: 'online',
    documentation: {
      planner: [
        'POST /api/planner/generate',
        'POST /api/planner/save',
        'GET  /api/planner/itineraries/:id'
      ],
      routing: [
        'POST /api/route/calculate'
      ],
      gems: [
        'GET  /api/gems',
        'POST /api/gems/create',
        'POST /api/gems/:id/upvote'
      ],
      monuments: [
        'POST /api/monuments/identify',
        'GET  /api/monuments/samples',
        'GET  /api/monuments/:id',
        'GET  /api/monuments'
      ]
    }
  });
});

// 404 Handler
app.use((req, res, _next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Startup & Seed
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`[ExplorerIQ Server] Running at http://localhost:${PORT}`);
    console.log(`[ExplorerIQ Server] API Base: http://localhost:${PORT}/api`);
  });
};

startServer();

export default app;
