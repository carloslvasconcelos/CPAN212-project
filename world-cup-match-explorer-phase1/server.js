import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import matchesRouter from './src/routes/matches.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'API up (Phase 1 dummy)' });
});

// Routes
app.use('/api/v1/matches', matchesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
