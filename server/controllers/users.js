const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findMany();
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(200).json("No users to show.");
    }
  } catch (err) {
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
  getUser,
  getAllUsers,
};
