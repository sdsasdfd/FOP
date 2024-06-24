import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
