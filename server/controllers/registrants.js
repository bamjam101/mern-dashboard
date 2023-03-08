const User = require("../models/User");
const Wallet = require("../models/Wallet");

const getUnapprovedUsers = async (req, res) => {
  try {
    if (
      req.user.role === "superadmin" ||
      req.user.role === "admin" ||
      req.user.role === "partial-admin"
    ) {
      const registrants = await User.find({
        isApproved: false,
        isEmailVerified: true,
      }).select("-password");
      if (registrants?.length < 1) {
        return res.status(200).json("No registrants to display.");
      } else {
        return res.status(200).json(registrants);
      }
    } else {
      return res.status(400).json("Unauthorized");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleUserApproval = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, isApproved: true },
      {
        new: true,
      }
    );
    if (user) {
      const wallet = new Wallet({
        userId: user._id,
      });
      await wallet.save();
      return res.status(200).json("Profile has been updated.");
    } else {
      return res.status(400).json("Failed to update profile.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUnapprovedUsers,
  handleUserApproval,
};
