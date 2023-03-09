const User = require("../models/User");
const Token = require("../models/Token");
const referralCodes = require("referral-codes");
const bcrypt = require("bcrypt");
const Wallet = require("../models/Wallet");

const createUser = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const { name, contact, role, email, pan, aadhar, error } = req.body;

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
    const users = await User.find({ role: "user" }).select("-password");
    if (!users) return res.status(201).json("No user found.");

    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (
      req.user.role !== "superadmin" &&
      req.user.role !== "admin" &&
      req.user.role !== "partialAdmin"
    )
      return res.status(401).json("Not authorized to make such request.");
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("No such user found.");
    if (user.role === "user" || user.role === "partialAdmin") {
      await user.delete();
    } else return res.status(400).json("Cannot process request.");
  } catch (error) {
    console.log(error);
    res.status(500).json(500);
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

module.exports = {
  createUser,
  getMe,
  getUser,
  deleteUser,
  getAllUsers,
};
