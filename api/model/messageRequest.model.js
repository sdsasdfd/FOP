import mongoose, { Schema } from "mongoose";

const messageRequestSchema = new Schema(
  {
    requestStatus: {
      type: String,
      enums: ["accepted", "rejected", "pending"],
      default: "pending",
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

export const MessageRequest = mongoose.model(
  "MessageRequest",
  messageRequestSchema
);
