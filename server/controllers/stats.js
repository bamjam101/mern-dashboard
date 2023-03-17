const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Request = require("../models/Request");

const getUserStats = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const allUsers = await User.find({ role: "user", isApproved: true });
    const inActiveUsers = await User.find({ role: "user", isActive: false });
    const userStats = {
      allUsers: allUsers.length,
      inActiveUsers: inActiveUsers.length,
      activeUsers: allUsers.length - inActiveUsers.length,
    };
    return res.status(200).json(userStats);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getInvestmentStats = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const allUsers = await User.find({ role: "user", isApproved: true });
    const inActiveWallets = await Wallet.find({ active: false });

    const investment = allUsers.length * 200;

    //return amount of investment withdrawn from 200 if the wallet is inactive then
    //it means that the investment money is withdrawn
    //to find out how much money has been withdrawn
    //find the sum of all the 200 - balance left. You'll get the money withdrawn
    const investmentWithdrawn = inActiveWallets.length * 200;
    const investmentRemaining = investment - investmentWithdrawn;

    const invStats = {
      investment,
      investmentWithdrawn,
      investmentRemaining,
    };

    return res.status(200).json(invStats);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getWithdrawalRequestStats = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const requests = await Request.find();
    const numberOfRequests = requests.length;
    res.status(200).json({ numberOfRequests });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRegistrantsStats = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const registrants = await User.find({
      isApproved: false,
      isEmailVerified: true,
    }).select("-password");
    const numberOfRegistrants = registrants.length;
    res.status(200).json(numberOfRegistrants);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTransactions = async (req, res) => {
  try {
    if (req.user.role === "user")
      return res.status(401).json("Not authorized to make such request.");
    const transactions = await Request.find({ status: { $ne: "pending" } });
    console.log(transactions);
    if (!transactions) return res.status(404).json("No transactions found.");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUserStats,
  getInvestmentStats,
  getWithdrawalRequestStats,
  getRegistrantsStats,
  getTransactions,
};
