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
  },
  servicerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Gig = mongoose.model("Gig", gigSchema);

export default Gig;
