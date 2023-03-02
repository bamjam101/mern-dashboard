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

const getUnapprovedUsers = async (req, res) => {
  try {
    const registrants = await User.find({ isApproved: false }).select(
      "-password"
    );
    if (registrants?.length < 1) {
      res.status(200).json("No registrants to display.");
    } else {
      res.status(200).json(registrants);
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
  getUnapprovedUsers,
};
