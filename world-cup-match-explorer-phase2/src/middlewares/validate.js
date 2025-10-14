import { validationResult } from 'express-validator';

export function validate(rules) {
  return async (req, res, next) => {
    await Promise.all(rules.map(rule => rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) return next();
    return res.status(400).json({
      success: false,
      error: { message: 'Validation error', details: result.array() }
    });
  };
}
