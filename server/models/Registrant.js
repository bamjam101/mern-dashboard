const mongoose = require("mongoose");

const RegistrantSchema = new mongoose.Schema(
  {
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
      default: "regular",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registrant", RegistrantSchema);
