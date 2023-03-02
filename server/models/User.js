const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
      max: 12,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["regular", "admin", "superadmin", "partialAdmin"],
      default: "regular",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
