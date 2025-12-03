import { Router } from "express";

import { registerRules } from "./middlewares/register-rules.js";
import { loginRules } from "./middlewares/login-rules.js";
import { verifyLoginRules } from "./middlewares/verify-login-rules.js";

import UserModel from "./models/user.model.js";
import OTPModel from "./models/otp.model.js";

import { matchPassword } from "../../shared/utils/password-utils.js";
import { encodeToken } from "../../shared/utils/jwt-utils.js";
import authorize from "../../shared/middlewares/authorize.js";

import { sendEmail } from "../../shared/utils/email-utils.js";
import { randomNumberOfNDigits } from "../../shared/utils/compute-utils.js";

const router = Router();

/**
 * LOGIN — SEND OTP
 */
router.post("/users/login", loginRules, async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return res.status(404).json({
      errorMessage: `User with ${email} doesn't exist`,
    });
  }

  const passwordMatched = matchPassword(password, foundUser.password);
  if (!passwordMatched) {
    return res.status(401).json({
      errorMessage: "Email and password didn't matched",
    });
  }

  const otp = randomNumberOfNDigits(6);

  await OTPModel.findOneAndUpdate(
    { account: foundUser._id },
    { account: foundUser._id, otp },
    { upsert: true, new: true }
  );

  await sendEmail(
    foundUser.email,
    "Your Login OTP Code",
    `Your OTP code is: ${otp}`
  );

  return res.json({ message: "OTP has been sent to your email." });
});

/**
 * VERIFY LOGIN — CHECK OTP + RETURN TOKEN
 */
router.post("/users/verify-login", verifyLoginRules, async (req, res) => {
  const { email, otp } = req.body;

  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    return res.status(404).json({
      errorMessage: `User with ${email} doesn't exist`,
    });
  }

  const otpRecord = await OTPModel.findOne({
    account: foundUser._id,
    otp,
  });

  if (!otpRecord) {
    return res.status(401).json({
      errorMessage: "OTP verification failed",
    });
  }

  const userWithoutPassword = {
    ...foundUser.toObject(),
    password: undefined,
  };

  const token = encodeToken(userWithoutPassword);

  return res.json({
    message: "Login verified successfully",
    user: userWithoutPassword,
    token,
  });
});

/**
 * REGISTER USER
 */
router.post("/users/register", registerRules, async (req, res) => {
  const newUser = req.body;

  const existingUser = await UserModel.findOne({ email: newUser.email });
  if (existingUser) {
    return res.status(500).json({
      errorMessage: `User with ${newUser.email} already exist`,
    });
  }

  const addedUser = await UserModel.create(newUser);

  const userWithoutPassword = {
    ...addedUser.toObject(),
    password: undefined,
  };

  return res.json(userWithoutPassword);
});

/**
 * GET ALL USERS (ADMIN ONLY)
 */
router.get("/users", authorize(["admin"]), async (req, res) => {
  const users = await UserModel.find().select("-password");
  return res.json(users);
});

/**
 * GET USER BY ID (ADMIN OR OWNER)
 */
router.get("/users/:id", authorize(["admin", "customer"]), async (req, res) => {
  const userID = req.params.id;
  const requester = req.account;

  const isAdmin = requester.role === "admin";

  if (!isAdmin && String(requester._id) !== String(userID)) {
    return res.status(403).json({ errorMessage: "Access denied" });
  }

  const foundUser = await UserModel.findById(userID).select("-password");

  if (!foundUser) {
    return res.status(404).json({
      errorMessage: `User with ${userID} doesn't exist`,
    });
  }

  return res.json(foundUser);
});

export default router;