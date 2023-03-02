const bcrypt = require("bcrypt");
const User = require("../models/User");

const handleUserSignUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const existingUser = await User.find();
    console.log(existingUser);
    if (existingUser?.length) {
      console.log("Expected behaviour");
      console.log(req.body);
      const newUser = new User({
        name: "username",
        email: req.body.email,
        contact: req.body.contact,
        password: hashedPass,
        role: "regular",
        isApproved: false,
      });
      console.log(newUser);
      const user = await newUser.save();
      console.log(user);
      res.status(200).json(user);
    } else {
      const admin = new User({
        name: "anonymous",
        email: req.body.email,
        contact: "8850425907",
        password: hashedPass,
        role: "superadmin",
        isApproved: true,
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
    // const existingUser = await User.findById(req.body._id);
    // const pass = existingUser.password;
    // console.log("hi");
    // console.log(req.body);
    // const newUser = {
    //   name: req.body.name,
    //   contact: req.body.contact,
    //   password: pass,
    //   email: req.body.email,
    //   role: req.body.role,
    //   isApproved: true,
    // };
    // const user = User.findByIdAndUpdate(req.body.id, newUser, { new: true });
    // res.status(200).json(user);

    const user = await User.findByIdAndUpdate(
      req.body._id,
      { ...req.body, isApproved: true },
      {
        new: true,
      }
    );
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
