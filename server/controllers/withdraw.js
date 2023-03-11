const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Request = require("../models/Request");

const postWithdrawalRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json("Invalid Request");
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet && wallet?.active)
      return res.status(400).json("Wallet is inactive");
    const pending = await Request.findOne({ requestedBy: user._id });
    if (pending)
      return res.status(400).json({
        message: "Cannot make another request, Wait for last one to process.",
      });

    const { amount, error } = req.body;
    if (error) return res.status(400).json("App error encountered");
    const request = await Request.create({
      requestedBy: user._id,
      transactionAmount: parseInt(amount),
      dispatchTime: Date.now(),
    });
    if (!request)
      return res.status(400).json("Error occurred, could not process request.");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllWithdrawalRequests = async (req, res) => {};

module.exports = {
  postWithdrawalRequest,
  getAllWithdrawalRequests,
};
