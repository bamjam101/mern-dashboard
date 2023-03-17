const User = require("../models/User");
const Wallet = require("../models/Wallet");
const sendEmail = require("../utlis");

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
    console.log("this is handle user approval");
    console.log(req.user);
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, isApproved: true },
      {
        new: true,
      }
    );
    if (!user) return res.status(400).json("User not found.");
    const existingWallet = await Wallet.findOne({ userId: user._id });
    if (existingWallet)
      return res.status(400).json("Can not define another wallet.");
    const wallet = new Wallet({
      userId: user._id,
    });
    await wallet.save();
    const url = `${process.env.APP_BASE_URL}/user`;
    await sendEmail(
      user.email,
      "Your account has been approved.",
      url,
      "approved"
    );
    res.status(200).json("Profile has been updated.");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUnapprovedUsers,
  handleUserApproval,
};
