const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  investment: {
    type: Number,
    default: 200,
    min: 200,
  },
  wallet: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
