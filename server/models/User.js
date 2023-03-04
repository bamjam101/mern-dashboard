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
      unique: true,
    },
    aadhar: {
      type: String,
      unique: true,
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
      enum: ["superadmin", "admin", "partialAdmin", "user"],
      default: "user",
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

UserSchema.path("referralLinks").validate(function (value) {
  console.log(value.length);
  if (value.length > 5) {
    throw new Error("Only 5 Referral Are Allowed At Once!");
  }
});

module.exports = mongoose.model("User", UserSchema);
