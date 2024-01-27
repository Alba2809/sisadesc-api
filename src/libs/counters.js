import mongoose from "mongoose";

export const Counter = mongoose.model(
  "Counter",
  new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  })
);

const getNextSequence = async (sequenceName) => {
  try {
    const result = await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    return result.seq;
  } catch (error) {
    console.log(error);
  }
};

export default getNextSequence;
