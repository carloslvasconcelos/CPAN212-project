import { body, param } from 'express-validator';

export const teamValidationRules = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('fifaCode').isString().notEmpty().withMessage('fifaCode is required'),
  body('confederation').isString().notEmpty().withMessage('confederation is required'),
  body('crestUrl').optional().isURL().withMessage('crestUrl must be a valid URL')
];

export const teamIdParamRule = [ param('id').isString().notEmpty() ];
