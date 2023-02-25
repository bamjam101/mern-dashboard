const bcrypt = require("bcrypt");
const User = require("../models/User");
const Registrant = require("../models/Registrant");

const handleRegistrantSignUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newRegistrant = new Registrant({
      email: req.body.email,
      password: hashedPass,
    });

    const registrant = await newRegistrant.save();
    res.status(200).json(registrant);
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
    const user = await User.findOne({ name: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  handleRegistrantApproval,
  handleRegistrantSignUp,
  handleUserLogin,
};
