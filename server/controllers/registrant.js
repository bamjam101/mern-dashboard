const Registrant = require("../models/Registrant");
const User = require("../models/User");

const getAllRegistrants = async (req, res) => {
  try {
    const registrants = await Registrant.findMany();
    const { password, ...others } = registrants._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRegistrants,
};
