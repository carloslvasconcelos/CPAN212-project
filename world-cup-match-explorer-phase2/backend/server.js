import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './src/shared/middlewares/connect-db.js';
import matchesRouter from './src/modules/matches/matches.routes.js';
import teamsRouter from './src/modules/teams/teams.routes.js';
import userRoutes from './src/modules/users/users.routes.js';
import notFound from './src/middlewares/notFound.js';
import errorHandler from './src/middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);

const app = express();

connectDB();

// Application-level middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'API up (Phase 2)' });
});

// Feature modules
app.use('/api/v1/matches', matchesRouter);
app.use('/api/v1/teams', teamsRouter);
app.use('/api/v1/auth', userRoutes);

// 404 & Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
