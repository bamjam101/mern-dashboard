const mongoose = require("mongoose");
const User = require("../models/User");
const Token = require("../models/Token");
const referralCodes = require("referral-codes");
const bcrypt = require("bcrypt");
const Wallet = require("../models/Wallet");
const sendEmail = require("../utlis");

const createUser = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const { name, contact, role, email, pan, referral, aadhar, error } =
      req.body;

    if (error) return res.status(400).json("Application error encountered.");
    if (!(email && name && contact && role && pan && aadhar)) {
      res.status(400).send("All inputs are required");
    }

    let user = await User.findOne({ email });
    if (user) return res.status(409).json("This Email Is Already In Use!");
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash("test111", salt);
    const referrals = referralCodes.generate({
      prefix: "richdollar-",
      length: 10,
      count: 5,
    });

    if (referral !== "") {
      const array = referral.split("/");
      const referralInfo = {
        referredBy: array[0],
        uid: mongoose.Types.ObjectId(array[1]),
        link: array[2],
      };
      const referredByUser = await User.findOne({
        _id: referralInfo.referredBy,
      });
      if (!referredByUser) return res.status(400).json("Invalid Referral");

      let referralMatches = false;
      let index = 0;
      referredByUser.referralLinks.forEach((referral) => {
        const { link } = referral;
        if (link === referralInfo.link) {
          referralMatches = true;
          referredByUser.referralLinks[index].isUsed = true;
        }
        index = index + 1;
      });
      if (!referralMatches)
        return res.status(400).json("Referral is either exhausted or invalid.");
      const newUser = new User({
        _id: referralInfo.uid,
        name,
        email,
        contact,
        pan,
        aadhar,
        password: hashedPass,
        isEmailVerified: true,
        isApproved: true,
        referredBy: referralInfo.referredBy,
        referralLinks: [
          {
            link: referrals[0],
          },
          {
            link: referrals[1],
          },
          {
            link: referrals[2],
          },
          {
            link: referrals[3],
          },
          {
            link: referrals[4],
          },
        ],
      });
      user = await newUser.save();
      if (!user)
        return res
          .status(500)
          .json("Internal Server Error. User Creation Failed.");
      await referredByUser.save();
      const wallet = new Wallet({
        userId: user._id,
      });
      await wallet.save();
    } else {
      const newUser = new User({
        name,
        email,
        contact,
        role,
        pan,
        aadhar,
        isEmailVerified: true,
        isApproved: true,
        password: hashedPass,
        referralLinks: [
          {
            link: referrals[0],
          },
          {
            link: referrals[1],
          },
          {
            link: referrals[2],
          },
          {
            link: referrals[3],
          },
          {
            link: referrals[4],
          },
        ],
      });
      user = await newUser.save();

      const wallet = new Wallet({
        userId: user._id,
      });
      await wallet.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (
      req.user.role !== "superadmin" &&
      req.user.role !== "admin" &&
      req.user.role !== "partialAdmin"
    )
      return res.status(401).json("Not authorized to make such request.");
    const users = await User.find({ role: "user", isApproved: true }).select(
      "-password"
    );
    if (!users) return res.status(201).json("No user found.");

    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("No such user found.");
    const { pan, aadhar, role } = req.body;
    if (user.role === "user") {
      user.pan = pan;
      user.aadhar = aadhar;
      user.role = role;
      await user.save();
    } else return res.status(400).json("Cannot process request.");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("No such user found.");
    if (user.role === "user") {
      const wallet = await Wallet.findOne({ userId: user._id });
      if (!wallet) return res.status(404).json("User wallet not found.");
      user.isActive = false;
      wallet.active = false;
      await wallet.save();
      await user.save();
      const url = `${process.env.APP_BASE_URL}`;
      await sendEmail(user.email, "Account has been shut down.", url, "ceased");
    } else return res.status(400).json("Cannot process request.");
  } catch (error) {
    console.log(error);
    res.status(500).json(500);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json("No such user exists.");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  getMe,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
