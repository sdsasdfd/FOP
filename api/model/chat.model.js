import mongoose, { Schema } from "mongoose";
const chatSchema = new Schema(
  {
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ChatMessage", default: [] },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
