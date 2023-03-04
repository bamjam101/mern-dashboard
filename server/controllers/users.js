const User = require("../models/User");
const Token = require("../models/Token");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findMany();
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(200).json("No users to show.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUnapprovedUsers = async (req, res) => {
  try {
    const registrants = await User.find({
      isApproved: false,
      isEmailVerified: true,
    }).select("-password");
    if (registrants?.length < 1) {
      res.status(200).json("No registrants to display.");
    } else {
      res.status(200).json(registrants);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(200).json("No user of such sort.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleEmailVerification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json("Invalid Link");
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res
        .status(400)
        .json("Email has already been verified. Move to Login.");
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        isEmailVerified: true,
      }
    );
    await Token.deleteMany({ userId: user._id });
    res.status(200).json("Email Verified");
  } catch (err) {
    res.status(200).json(err);
  }
};

module.exports = {
  handleEmailVerification,
  getUser,
  getAllUsers,
  getUnapprovedUsers,
};
