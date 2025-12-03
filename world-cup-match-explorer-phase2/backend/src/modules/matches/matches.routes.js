import { Router } from 'express';
import { validate } from '../../middlewares/validate.js';
import { matchValidationRules, matchIdParamRule } from './matches.validation.js';
import {
  getAllMatches,
  getMatchById,
  addMatch,
  updateMatch,
  deleteMatch
} from './matches.model.js';
import authorize from "../../shared/middlewares/authorize.js"; // ADDED protects admin-only routes

const router = Router();

// GET all
router.get('/', async (req, res, next) => {
  try {
    const data = await getAllMatches({}, req.query);
    res.json({ success: true, data });
  } catch (err) { 
    next(err); 
  }
});

// GET by id
router.get('/:id', validate(matchIdParamRule), async (req, res, next) => {
  try {
    const item = await getMatchById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: { message: 'Match not found' } });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

// POST create
router.post('/', authorize(["admin"]), validate(matchValidationRules), async (req, res, next) => {
  try {
    const created = await addMatch(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', authorize(["admin"]), validate([...matchIdParamRule, ...matchValidationRules]), async (req, res, next) => {
  try {
    const updated = await updateMatch(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: { message: 'Match not found' } });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', authorize(["admin"]), validate(matchIdParamRule), async (req, res, next) => {
  try {
    const ok = await deleteMatch(req.params.id);
    if (!ok) return res.status(404).json({ success: false, error: { message: 'Match not found' } });
    res.json({ success: true, message: 'Match deleted' });
  } catch (err) { next(err); }
});

export default router;
