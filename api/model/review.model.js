import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    servicerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const review = mongoose.model("Review", reviewSchema);
export default review;
