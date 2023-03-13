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
    const pending = await Request.findOne({
      requestedBy: user._id,
      status: "pending",
    });
    if (pending)
      return res
        .status(400)
        .json("Cannot make another request, Wait for last one to process.");

    const { amount, error } = req.body;
    if (error) return res.status(400).json("App error encountered");
    const request = await Request.create({
      transactionHolder: user.name,
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

const getAllWithdrawalRequests = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const requests = await Request.find({ status: "pending" });

    if (!requests) return res.status(201).json("No requests to display.");

    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const withdrawalApproval = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json("Invalid Request");
    const wallet = await Wallet.findOne({ userId: user._id });

    const pending = await Request.findOne({ requestedBy: user._id });

    const { transactionAmount, status, error } = req.body;
    if (error) return res.status(400).json("App error encountered");

    const newBalance = wallet.balance - parseInt(transactionAmount);
    if (newBalance < 0) {
      pending.status = status;
      wallet.transaction = [
        ...wallet.transaction,
        { amount: transactionAmount, status: status },
      ];
      await pending.save();
      await wallet.save();
    } else {
      wallet.balance = newBalance;
      if (wallet.balance < 200) {
        wallet.active = false;
      }
      pending.status = status;
      wallet.transaction = [
        ...wallet.transaction,
        { amount: transactionAmount, status: status },
      ];
      await pending.save();
      await wallet.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const withdrawalRejection = async (req, res) => {};

module.exports = {
  postWithdrawalRequest,
  getAllWithdrawalRequests,
  withdrawalApproval,
  withdrawalRejection,
};
