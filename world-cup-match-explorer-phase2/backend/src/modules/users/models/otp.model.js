import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  otp: { type: String, required: true },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

const OTPModel = mongoose.model("OTPModel", otpSchema);
export default OTPModel;
