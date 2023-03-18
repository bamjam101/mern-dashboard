const Request = require("../models/Request");

const getTransactions = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const transactions = await Request.find({ status: { $ne: "pending" } });
    if (!transactions) return res.status(404).json("No transactions found.");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMyTransaction = async (req, res) => {
  try {
    const transactions = await Request.find({ requestedBy: req.user._id });
    if (!transactions) return res.status(404).json("No transactions found.");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserTransaction = async (req, res) => {
  try {
    const transactions = await Request.find({ requestedBy: req.params.id });
    if (!transactions) return res.status(404).json("No transactions found.");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getMyTransaction,
  getUserTransaction,
  getTransactions,
};
