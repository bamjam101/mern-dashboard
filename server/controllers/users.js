const User = require("../models/User");
const Token = require("../models/Token");
const referralCodes = require("referral-codes");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const { name, contact, role, email, password, referral, error } = req.body;

    if (error) return res.status(400).json("Application error encountered.");
    if (!(email && password && name && contact)) {
      res.status(400).send("All inputs are required");
    }
    let user = await User.findOne({ email });
    if (user) return res.status(409).res("This Email Is Already In Use!");
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(password, salt);
    const referrals = referralCodes.generate({
      prefix: "richdollar-",
      length: 10,
      count: 5,
    });
    const newUser = new User({
      name,
      email,
      contact,
      isEmailVerified: false,
      isApproved: true,
      password: hashedPass,
      role: role,
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

    const modelToken = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.APP_BASE_URL}/user/${modelToken.userId}/verify/${modelToken.token}`;
    await sendEmail(user.email, "Verify Your Gmail For Richdollar", url);
    res
      .status(200)
      .json("Email registered. Please verify your email to proceed to login.");
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
    const users = await User.find().select("-password");
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
