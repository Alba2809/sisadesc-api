import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Subject", subjectSchema);
