import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
  coverImg: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 1200,
  },
  servicerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subCategory: {
    type: [String],
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  averageRating: {
    type: String,
    default: "0.0",
  },
});

const Gig = mongoose.model("Gig", gigSchema);

export default Gig;
