import mongoose from "mongoose";
import { encodePassword } from "../../../shared/utils/password-utils.js";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: String,

    password: {
      type: String,
      required: true,
    },

    address: String,

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

// automatic hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = encodePassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
