const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../utlis");

const handleUserSignUp = async (req, res) => {
  try {
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
        role: "regular",
        isApproved: false,
      });

      // Email verification dispatch

      // let mailOptions = {
      //   to: req.body.email,
      //   subject: "Verify Your Gmail For Richdollar",
      //   html: `<div style="display: 'flex', flexDirection='column', gap: '1rem', width: '100%', justifyContent: 'center', alignItems: 'center'">
      //     <button style="padding: '0.5rem 1rem', background: 'sky-blue', color: 'black', fontWeight: 'bold'">Verify Your Account</button>
      //     <p>Upon clicking on the button your account will be automatically verified and you will be redirected to our login page.</p>
      //     </div>`,
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     return console.log(error);
      //   }
      //   console.log("Message sent: %s", info.messageId);
      //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // });

      user = await newUser.save();

      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.APP_BASE_URL}/user/${user._id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Your Gmail For Richdollar", url);

      res.status(200).json(user);
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
      res.status(200).json(user);
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
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      const validated = await bcrypt.compare(req.body.password, user.password);
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
