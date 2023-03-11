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
        approved: {
          type: Boolean,
          default: false,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        rejected: {
          type: Boolean,
          default: false,
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
