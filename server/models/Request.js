const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transactionAmount: {
    type: Number,
  },
  dispatchTime: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Request", RequestSchema);
