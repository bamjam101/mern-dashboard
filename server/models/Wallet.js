const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    default: 200,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
