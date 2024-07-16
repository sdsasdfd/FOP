import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  complainDesc: {
    type: String,
    required: true,
  },
  servicerId: {
    type: String,
    default: null,
  },
  generalComplain: {
    type: Boolean,
    default: true,
  },
});

const Complain = mongoose.model("complain", complainSchema);

export default Complain;
