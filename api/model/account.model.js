import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
  {
    balance: {
      type: Number,
      default: 10000,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    earning: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Account = mongoose.model("Account", accountSchema);
