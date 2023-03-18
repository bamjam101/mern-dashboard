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
    const requests = await Request.find({ status: "pending" });
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

const getMyNetworkLength = async (req, res) => {
  try {
    const level = 5;
    const levelLengths = [];
    const queue = [];
    let currentLevel = 0;
    const networkOwner = await User.findById(req.user._id);
    if (!networkOwner) return res.status(401).json("Network doesn't exist.");

    queue.push(networkOwner._id);
    while (queue.length && currentLevel <= level) {
      const size = queue.length;
      let length = 0;
      for (let i = 0; i < size; i++) {
        const userId = queue.shift();
        const newUser = await User.findById(userId);

        newUser.referralLinks.forEach((referrals) => {
          if (referrals.isUsed) {
            length++;
            queue.push(referrals._id);
          }
        });
      }
      levelLengths.push(length);
      currentLevel++;
    }
    res.status(200).json(levelLengths);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUserStats,
  getInvestmentStats,
  getWithdrawalRequestStats,
  getRegistrantsStats,
  getMyNetworkLength,
};
