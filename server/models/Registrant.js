const mongoose = require("mongoose");

const RegistrantSchema = new mongoose.Schema(
  {
    contact: {
      type: String,
      unique: true,
      max: 12,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registrant", RegistrantSchema);
