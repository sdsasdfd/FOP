import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    isCompleted: {
      type: Boolean,
      default: false,
    },
    servicer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
