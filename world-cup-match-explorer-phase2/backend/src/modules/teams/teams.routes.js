import { Router } from 'express';
import { validate } from '../../middlewares/validate.js';
import { teamValidationRules, teamIdParamRule } from './teams.validation.js';
import {
  getAllTeams,
  getTeamById,
  addTeam,
  updateTeam,
  deleteTeam
} from './teams.model.js';

const router = Router();

//GET all

router.get('/', async (req, res, next) => {
  try {
    const data = await getAllTeams({}, req.query);
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

//GET by ID
router.get('/:id', validate(teamIdParamRule), async (req, res, next) => {
  try {
    const item = await getTeamById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: { message: 'Team not found' } });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});


//POST create
router.post('/', validate(teamValidationRules), async (req, res, next) => {
  try {
    const created = await addTeam(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) { next(err); }
});

//PUT update
router.put('/:id', validate([...teamIdParamRule, ...teamValidationRules]), async (req, res, next) => {
  try {
    const updated = await updateTeam(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: { message: 'Team not found' } });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
});

//DELETE
router.delete('/:id', validate(teamIdParamRule), async (req, res, next) => {
  try {
    const ok = await deleteTeam(req.params.id);
    if (!ok) return res.status(404).json({ success: false, error: { message: 'Team not found' } });
    res.json({ success: true, message: 'Team deleted' });
  } catch (err) { next(err); }
});

export default router;
