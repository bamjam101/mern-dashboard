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
    if (parseInt(amount) > wallet.balance)
      return res.status(400).json("Invalid request.");
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
      return res.status(401).json("Not authorized for making such request.");

    const { error } = req.body;
    if (error) return res.status(400).json("App error encountered");
    const user = await User.findById(req.params.id);
    const wallet = await Wallet.findOne({ userId: user._id });
    if (!user) return res.status(404).json("No Such User.");

    const pending = await Request.findOne({
      requestedBy: user._id,
      status: "pending",
    });
    console.log(wallet.balance);
    const transactionAmount = pending.transactionAmount;
    if (wallet.balance - transactionAmount < 200) {
      wallet.active = false;
    }
    const newBalance = wallet.balance - parseInt(transactionAmount);
    pending.status = "approved";
    wallet.balance = parseInt(newBalance);
    console.log(newBalance);

    await pending.save();
    await wallet.save();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const withdrawalRejection = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized for making such request.");
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("No Such User.");

    const pending = await Request.findOne({
      requestedBy: user._id,
      status: "pending",
    });

    pending.status = "rejected";

    const { error } = req.body;
    if (error) return res.status(400).json("App error encountered");

    await pending.save();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  postWithdrawalRequest,
  getAllWithdrawalRequests,
  withdrawalApproval,
  withdrawalRejection,
};
