const Network = require("../models/Network");
const User = require("../models/User");

const getMyNetwork = async (req, res) => {
  try {
    const level = 5;
    const networkArray = [];
    const queue = [];
    let currentLevel = 0;
    const networkOwner = await User.findById(req.user.id);
    if (!networkOwner) return res.status(401).json("Network doesn't exist.");

    queue.push(networkOwner._id);
    while (queue.length && currentLevel <= level) {
      const size = queue.length;
      const temporaryLevel = [];
      for (let i = 0; i < size; i++) {
        const userId = queue.shift();
        const newUser = await User.findById(userId);
        temporaryLevel.push({
          name: newUser.name,
          id: newUser._id,
          referredBy: newUser.referredBy,
        });
        newUser.referralLinks.forEach((referrals) => {
          if (referrals.isUsed) {
            queue.push(referrals._id);
          }
        });
      }
      networkArray.push(temporaryLevel);
      currentLevel++;
    }
    res.status(200).json({ data: networkArray, message: "Network Generated." });
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
