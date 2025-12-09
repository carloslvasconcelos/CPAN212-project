import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './src/shared/middlewares/connect-db.js';

import matchesRouter from './src/modules/matches/matches.routes.js';
import teamsRouter from './src/modules/teams/teams.routes.js';
import userRoutes from './src/modules/users/users.routes.js';

import notFound from './src/middlewares/notFound.js';
import errorHandler from './src/middlewares/errorHandler.js';

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'API running - Final Phase' });
});

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/matches', matchesRouter);
app.use('/api/v1/teams', teamsRouter);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
