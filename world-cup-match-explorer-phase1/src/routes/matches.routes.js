import { Router } from 'express';
const router = Router();

// GET /matches → lista (dummy)
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'match_1', year: 2018, stage: 'final', home: 'France', away: 'Croatia', score: '4-2' },
      { id: 'match_2', year: 2014, stage: 'semi', home: 'Brazil', away: 'Germany', score: '1-7' }
    ],
    message: 'All matches (dummy)'
  });
});

// GET /matches/:id → detalhe (dummy)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    data: { id, year: 2022, stage: 'final', home: 'Argentina', away: 'France', score: '3-3 (4-2 pens)' },
    message: `Single match (dummy for ${id})`
  });
});

// POST /matches → cria (dummy)
router.post('/', (req, res) => {
  const payload = req.body || {};
  res.status(201).json({
    success: true,
    data: { id: 'new_match_dummy', ...payload },
    message: 'Add match (dummy)'
  });
});

// DELETE /matches/:id → remove (dummy)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    message: `Delete match (dummy for ${id})`
  });
});

export default router;
