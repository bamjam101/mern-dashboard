const User = require("../models/User");

const getMyReferrals = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(401)
        .json("Invalid request. Please relogin to fix the issue.");
    if (user.isApproved) {
      res.status(200).json(user.referralLinks);
    } else {
      res.status(201).json({
        message: "Your Referrals Will Be Unlocked After KYC.",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserReferrals = async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(400).json("Not authorized for making such request.");
    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res
        .status(401)
        .json("Invalid request. Please relogin to fix the issue.");
    if (user.isApproved) {
      res.status(200).json(user.referralLinks);
    } else {
      res.status(200).json("Your Referrals Will Be Unlocked After KYC.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getMyReferrals,
  getUserReferrals,
};
