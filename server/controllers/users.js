const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utlis");

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

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
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

const handlePasswordChangeOTPGeneration = async (req, res) => {
  const { error } = req.body;
  if (error) return res.status(400).json("Error occurred in application.");

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json("No user exist with given credentials!");

  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const url = `${process.env.APP_BASE_URL}/user/${token.userId}/reset/${token.token}`;
  await sendEmail(user.email, "Reset Your Account Password", url);
  res.status(200).json("Email to reset your password has been sent.");
};

const handlePasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json("Invalid Link");
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    if (!token)
      return res.status(400).json("Kindly check your link, it is incorrect.");
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        password: hashedPass,
      }
    );
    await Token.deleteMany({ userId: user._id });
    res.status(200).json("Password has been changed.");
  } catch (err) {
    res.status(200).json(err);
  }
};

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
      res.status(200).json("Your Referrals Will Be Unlocked After KYC.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserReferrals = async (req, res) => {
  try {
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
  getMe,
  getUser,
  handleEmailVerification,
  getAllUsers,
  getUnapprovedUsers,
  handlePasswordChangeOTPGeneration,
  handlePasswordReset,
  getMyReferrals,
  getUserReferrals,
};
