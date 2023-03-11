const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    min: 200,
    default: 200,
  },
  transaction: {
    type: [
      {
        amount: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        status: {
          type: String,
          enum: ["approved", "rejected"],
        },
      },
    ],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
