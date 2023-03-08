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
});

module.exports = mongoose.model("Wallet", WalletSchema);

WalletSchema.path("wallet").set(function () {
  this.wallet = this.investment;
});
