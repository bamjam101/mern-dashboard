const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      min: 2,
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
    pan: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    token: {
      type: String,
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
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    referralLinks: [
      {
        link: {
          type: String,
          unique: true,
        },
        isUsed: { type: Boolean, default: false },
        approvedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
