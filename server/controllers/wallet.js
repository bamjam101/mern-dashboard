const Wallet = require("../models/Wallet");
const User = require("../models/User");

const getMyWallet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(req.user.id);
    if (!user)
      return res
        .status(401)
        .json("Invalid request. Please relogin to fix the issue.");

    const wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet) return res.status(404).json("Wallet not found.");
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserWallet = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(400).json("Not authorized for making such request.");
    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res
        .status(401)
        .json("Invalid request. Please relogin to fix the issue.");
    console.log(req.params.id);
    const wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet) return res.status(404).json("Wallet not found.");
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getUserWallet,
  getMyWallet,
};
