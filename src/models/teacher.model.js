/* import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    teacherid: {
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
    rfc: {
      type: String,
      required: true,
      trim: true,
    },
    direction: {
      street: { type: String, required: true, trim: true, },
      colony: { type: String, required: true, trim: true, },
      postalcode: { type: String, required: true },
    },
    phonenumber: {
      type: String,
      trim: true,
      required: true,
    },
    birthdate: {
      type: Date,
      trim: true,
      required: true,
    },
    gender: {
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

export default mongoose.model("Teacher", teacherSchema);
 */