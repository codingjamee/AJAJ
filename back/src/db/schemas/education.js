import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    eduId: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    graduationDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
