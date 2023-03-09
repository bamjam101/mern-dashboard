const User = require("../models/User");

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
  getMe,
  getUser,
  deleteUser,
  getAllUsers,
};
