const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utlis");

const handlePasswordChangeOTPGeneration = async (req, res) => {
  const { error } = req.body;
  if (error) return res.status(400).json("Error occurred in application.");

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json("No user exist with given credentials!");

  const existingToken = await Token.findOne({ userId: user._id });
  if (existingToken)
    return res
      .status(400)
      .json("Cannot generate another request for recovery.");
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

module.exports = {
  handlePasswordReset,
  handlePasswordChangeOTPGeneration,
};
