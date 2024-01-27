import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentid: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastnamepaternal: {
      type: String,
      required: true,
      trim: true,
    },
    lastnamematernal: {
      type: String,
      required: true,
      trim: true,
    },
    curp: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
    },
    birthdate: {
      type: Date,
      trim: true,
      required: true,
    },
    direction: {
      street: { type: String, required: true },
      colony: { type: String, required: true },
      postalcode: { type: Number, required: true },
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: String,
      required: true,
      trim: true,
    },
    subjects: [
      {
        ref: "Subject",
        type: mongoose.Schema.Types.ObjectId,
        onDelete: "CASCADE",
      },
    ],
    phonenumber: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Student", studentSchema);
