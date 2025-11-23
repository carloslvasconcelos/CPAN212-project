import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
    },
    fifaCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    confederation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
