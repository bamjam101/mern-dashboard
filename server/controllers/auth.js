const bcrypt = require("bcrypt");
const User = require("../models/User");
const Registrant = require("../models/Registrant");

const handleRegistrantSignUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const existingUser = await User.find();
    if (existingUser?.length) {
      const newRegistrant = new Registrant({
        contact: req.body.contact,
        email: req.body.email,
        password: hashedPass,
      });
      const registrant = await newRegistrant.save();
      res.status(200).json(registrant);
    } else {
      const newUser = new User({
        name: "superadmin",
        email: req.body.email,
        password: hashedPass,
        role: "superadmin",
        isApproved: true,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const handleRegistrantApproval = async (req, res) => {
  try {
    const registrant = await Registrant.findOne({ email: req.body.email });
    if (!registrant) {
      res.status(400).json("Wrong credentials!");
    } else {
      const newUser = new User({
        ...registrant,
        name: req.body.name,
        role: req.body.role,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    }
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
  handleRegistrantApproval,
  handleRegistrantSignUp,
  handleUserLogin,
};
