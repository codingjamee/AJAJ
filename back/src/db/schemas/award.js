import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      ref: "User",
    },
    awrardId: {
      type: String,
      required: true,
    },
    award: {
      type: String,
      required: true,
    },
    awardContent: {
      type: String,
      required: true,
    },
    awardDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
