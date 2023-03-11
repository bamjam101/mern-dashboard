const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Request = require("../models/Request");

const postWithdrawRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json("Invalid Request");
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet && wallet?.active)
      return res.status(400).json("Wallet is inactive");

    const { amount, error } = req.body;
    if (error) return res.status(400).json("App error encountered");

    const balance = wallet.balance;
    wallet.balance = parseInt(balance) - parseInt(amount);
    const request = await Request.create({
      requestedBy: user._id,
      transactionAmount: amount,
      dispatchTime: Date.now(),
    });
    if (!request)
      return res.status(400).json("Error occurred, could not process request.");
    wallet.save();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllWithdrawalRequests = async (req, res) => {};

module.exports = {
  postWithdrawRequest,
  getAllWithdrawalRequests,
};
