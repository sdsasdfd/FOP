import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      enums: ["user", "servicer"],
      required: function () {
        return !this.isAdmin;
      },
      default: null,
    },
    location: {
      type: String,
      enums: ["dina", "jhelum"],
      required: function () {
        return !this.isAdmin;
      },
    },
    category: {
      type: String,
      enums: ["cleaning", "cooking", "tv-mounting"],
      required: function () {
        // console.log(this.roles);
        return (
          (!this.isAdmin && !this.roles === "user") || this.roles === "servicer"
        );
      },
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null,
    },
    imagePublicId: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
