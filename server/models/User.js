const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      min: 5,
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
    role: {
      type: String,
      enum: ["regular", "admin", "superadmin"],
      default: "regular",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referralLinks: {
      type: [
        {
          link: { type: String, unique: true },
          isUsed: { type: Boolean, default: false },
          connectedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
      validate: [referralLimit, "Referrals Have Been Exhausted!"],
    },
  },
  { timestamps: true }
);

function referralLimit(val) {
  return val.length < 5;
}

module.exports = mongoose.model("User", UserSchema);
