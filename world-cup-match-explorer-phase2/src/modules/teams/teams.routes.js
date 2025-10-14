import { Router } from 'express';
import { validate } from '../../middlewares/validate.js';
import { teamValidationRules, teamIdParamRule } from './teams.validation.js';
import {
  getAllTeams,
  getTeamById,
  addNewTeam,
  updateExistingTeam,
  deleteTeam
} from './teams.model.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await getAllTeams();
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

router.get('/:id', validate(teamIdParamRule), async (req, res, next) => {
  try {
    const item = await getTeamById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: { message: 'Team not found' } });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.post('/', validate(teamValidationRules), async (req, res, next) => {
  try {
    const created = await addNewTeam(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) { next(err); }
});

router.put('/:id', validate([...teamIdParamRule, ...teamValidationRules]), async (req, res, next) => {
  try {
    const updated = await updateExistingTeam(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: { message: 'Team not found' } });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
});

router.delete('/:id', validate(teamIdParamRule), async (req, res, next) => {
  try {
    const ok = await deleteTeam(req.params.id);
    if (!ok) return res.status(404).json({ success: false, error: { message: 'Team not found' } });
    res.json({ success: true, message: 'Team deleted' });
  } catch (err) { next(err); }
});

export default router;
