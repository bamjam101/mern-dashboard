const mongoose = require("mongoose");

const NetworkSchema = mongoose.Schema({
  networkId: {
    type: String,
    required: true,
    unique: true,
  },
  networkStrength: {
    type: Number,
    required: true,
  },
  networkOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Network", NetworkSchema);
