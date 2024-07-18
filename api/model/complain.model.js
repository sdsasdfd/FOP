import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  complainDesc: {
    type: String,
    required: true,
  },
  servicerId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",
    default: null,
  },
  generalComplain: {
    type: Boolean,
    default: true,
  },
  subject: {
    type: String,
    default: null,
  },
});

const Complain = mongoose.model("complain", complainSchema);

export default Complain;
