const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../utlis");
const referralCodes = require("referral-codes");
const jwt = require("jsonwebtoken");

const handleUserSignUp = async (req, res) => {
  try {
    const { name, contact, email, password, error } = req.body;

    if (error) return res.status(400).json("Application error encountered.");
    if (!(email && password && name && contact)) {
      res.status(400).send("All inputs are required");
    }
    let user = await User.findOne({ email });
    if (user) return res.status(409).res("This Email Is Already In Use!");
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(password, salt);

    const existingUser = await User.find();
    if (existingUser?.length) {
      const referrals = referralCodes.generate({
        prefix: "richdollar-",
        length: 10,
        count: 5,
      });

      const newUser = new User({
        name,
        email,
        contact,
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
      // declare jwt token
      // const jwtToken = jwt.sign(
      //   { user_id: user._id, email },
      //   process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "1h",
      //   }
      // );
      // save user token
      // newUser.token = jwtToken;
      user = await newUser.save();

      const modelToken = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.APP_BASE_URL}/user/${modelToken.userId}/verify/${modelToken.token}`;
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

      await admin.save();
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
    const { email, password, error } = req.body;
    if (error) return res.status(400).json("Application error encountered.");
    if (!(email && password)) {
      res.status(400).json("All inputs are required.");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // const jwtToken = jwt.sign(
      //   { user_id: user._id, email },
      //   process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "1h",
      //   }
      // );

      // // save user token
      // user.token = jwtToken;

      const { password, ...others } = user._doc;
      res.status(200).json(others);
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
