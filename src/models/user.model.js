import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      street: { type: String },
      colony: { type: String },
      postalcode: { type: Number },
    },
    phonenumber: {
      type: String,
      trim: true,
    },
    birthdate: {
      type: Date,
      trim: true,
    },
    status: {
      type: String,
    },
    imageperfile: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      ref: "Role",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("User", userSchema);
