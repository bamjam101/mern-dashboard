const Network = require("../models/Network");
const User = require("../models/User");

const getMyNetwork = async (req, res) => {
  try {
    const network = await Network.findById(req.user.id);
    if (!network) return res.status(400).json("Network doesn't exist");

    // generate 5 level network using User model

    res.status(200).json({ data: null, message: "Network Generated." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserNetwork = async (req, res) => {
  try {
    const network = await Network.findById(req.params.id);
    if (!network) return res.status(400).json("Network doesn't exist");

    // generate 5 level network using User model

    res.status(200).json({ data: null, message: "Network Generated." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllNetwork = async (req, res) => {
  try {
    const networks = await Network.find();
    if (!networks) return res.status(400).json("No networks to display.");

    res.status(200).json(networks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getMyNetwork,
  getUserNetwork,
  getAllNetwork,
};
