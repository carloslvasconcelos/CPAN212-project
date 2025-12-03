import { body } from "express-validator";

export const verifyLoginRules = [
  body("email")
    .isEmail()
    .withMessage("A valid email is required"),

  body("otp")
    .notEmpty()
    .withMessage("OTP code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be exactly 6 digits"),
];