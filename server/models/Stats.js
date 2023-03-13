const mongoose = require("mongoose");

const UserStat = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  returns: {
    type: Number,
  },
  incentives: {
    type: Number,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserStat", UserStat);
