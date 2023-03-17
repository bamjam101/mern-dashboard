const Wallet = require("./models/Wallet");
const User = require("./models/User");
const cron = require("node-cron");

const automateIncentives = async () => {
  try {
    const users = await User.find({ role: "user", isActive: true });
    if (users.length) {
      for (let user = 0; user < users.length; user++) {
        const level = 5;
        const queue = [];
        let currentLevel = 0;
        const networkOwner = users[user];
        if (networkOwner.referralLinks.some((link) => link.isUsed === false))
          continue;
        const wallet = await Wallet.findOne({ userId: networkOwner._id });
        let newBalance = wallet.balance;

        queue.push(networkOwner._id);
        while (queue.length && currentLevel <= level && wallet.balance >= 200) {
          const size = queue.length;
          for (let i = 0; i < size; i++) {
            const userId = queue.shift();
            const newUser = await User.findById(userId);
            const newUserWallet = await Wallet.findOne({ userId });
            if (newUserWallet && newUserWallet.balance >= 200) {
              let interestRate;
              if (currentLevel === 1) {
                interestRate = 10 / 100;
              } else {
                interestRate = 5 / 100;
              }
              const incentive = 200 * interestRate;
              newBalance = newBalance + incentive;
            }
            newUser.referralLinks.forEach((referrals) => {
              if (referrals.isUsed) {
                queue.push(referrals._id);
              }
            });
          }
          currentLevel++;
        }
        wallet.balance = newBalance;
        await wallet.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.task = cron.schedule("0 0 1 * *", automateIncentives);
