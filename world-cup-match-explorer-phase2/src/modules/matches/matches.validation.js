import { body, param } from 'express-validator';

export const matchValidationRules = [
  body('year').isInt({ min: 1900 }).withMessage('year must be an integer'),
  body('stage').isString().notEmpty().withMessage('stage is required'),
  body('home').isString().notEmpty().withMessage('home is required'),
  body('away').isString().notEmpty().withMessage('away is required'),
  body('score').isString().notEmpty().withMessage('score is required'),
  body('date').optional().isISO8601().withMessage('date must be ISO8601'),
  body('venue').optional().isString()
];

export const matchIdParamRule = [ param('id').isString().notEmpty() ];
