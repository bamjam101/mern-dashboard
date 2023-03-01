const Registrant = require("../models/Registrant");
const User = require("../models/User");

const getAllRegistrants = async (req, res) => {
  try {
    const registrants = await Registrant.find().select("-password");
    if (registrants?.length < 1) {
      res.status(200).json("No registrants to display.");
    } else {
      res.status(200).json(registrants);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRegistrants,
};
