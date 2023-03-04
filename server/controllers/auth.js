const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../utlis");

const handleUserSignUp = async (req, res) => {
  try {
    const { error } = req.body;
    if (error) return res.status(400).json("App error encountered.");
    const repeatedEmail = await User.findOne({ email: req.body.email });
    if (repeatedEmail)
      return res.status(409).res("This Email Is Already In Use!");
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const existingUser = await User.find();
    if (existingUser?.length) {
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(409).res("This Email Is Already In Use!");
      const newUser = new User({
        name: "username",
        email: req.body.email,
        contact: req.body.contact,
        password: hashedPass,
      });

      user = await newUser.save();

      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.APP_BASE_URL}/user/${token.userId}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Your Gmail For Richdollar", url);
      res
        .status(200)
        .json(
          "Email registered. Please verify your email to proceed to login."
        );
    } else {
      const admin = new User({
        name: "anonymous",
        email: req.body.email,
        contact: req.body.contact,
        password: hashedPass,
        role: "superadmin",
        isApproved: true,
        isEmailVerified: true,
      });

      const user = await admin.save();
      res.status(200).json("Superadmin declared successfully");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleUserApproval = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      { ...req.body, isApproved: true },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validated = await bcrypt.compare(req.body.password, user.password);
      console.log(validated);
      if (validated) {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } else {
        res.status(400).json("Wrong credentials!");
      }
    } else {
      res.status(400).json("Wrong credentials!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  handleUserApproval,
  handleUserSignUp,
  handleUserLogin,
};
