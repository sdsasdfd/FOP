import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    participantsFromChat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    feeAmount: {
      type: Number,
    },
    netAmount: {
      type: Number,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Payment = mongoose.model("Payment", paymentSchema);
