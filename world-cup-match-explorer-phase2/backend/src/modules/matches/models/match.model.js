import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1930, "Year must be valid"],
    },
    stage: {
      type: String,
      required: [true, "Stage is required"],
      trim: true,
    },
    home: {
      type: String,
      required: [true, "Home team is required"],
      trim: true,
    },
    away: {
      type: String,
      required: [true, "Away team is required"],
      trim: true,
    },
    score: {
      type: String,
      required: [true, "Score is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // adiciona createdAt e updatedAt automaticamente
  }
);

// exporta o modelo Mongoose
export default mongoose.model("Match", matchSchema);
