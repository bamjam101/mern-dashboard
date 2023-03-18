const User = require("../models/User");

const getMyNetwork = async (req, res) => {
  try {
    const level = 5;

    const queue = [];
    let currentLevel = 0;
    const networkOwner = await User.findById(req.user.id);
    //Replace network array with network tree
    const networkTree = {
      name: networkOwner.name,
      id: networkOwner.id,
      children: [],
    };
    if (!networkOwner) return res.status(401).json("Network doesn't exist.");

    queue.push({ node: networkTree, level: 0 });
    while (queue.length && currentLevel <= level) {
      const { node, level: currentLevel } = queue.shift();
      if (currentLevel >= level) continue;
      const user = await User.findById(node.id);
      if (!user) continue;
      for (const referral of user.referralLinks) {
        if (!referral.isUsed) continue;
        const childUser = await User.findById(referral._id);
        const child = { name: childUser.name, id: childUser.id, children: [] };
        node.children.push(child);
        queue.push({ node: child, level: currentLevel + 1 });
      }
    }
    res.status(200).json(networkTree);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// const getMyNetwork = async (req, res) => {
//   try {
//     const level = 5;
//     const networkTree = { name: "me", id: req.user.id, children: [] };
//     const queue = [];
//     let currentLevel = 0;
//     const networkOwner = await User.findById(req.user.id);
//     if (!networkOwner) return res.status(401).json("Network doesn't exist.");

//     queue.push({ node: networkTree, level: 0 });
//     while (queue.length && currentLevel <= level) {
//       const { node, level: currentLevel } = queue.shift();
//       if (currentLevel >= level) continue;
//       const userId = node.id;
//       const user = await User.findById(userId).populate(
//         "referralLinks.approvedUser"
//       );
//       if (!user) continue;
//       for (const referral of user.referralLinks) {
//         if (!referral.isUsed) continue;
//         const child = { name: referral.name, id: referral._id, children: [] };
//         node.children.push(child);
//         queue.push({ node: child, level: currentLevel + 1 });
//         populateTree(child, currentLevel + 1);
//       }
//     }
//     res.status(200).json({ data: networkTree, message: "Network Generated." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

// const populateTree = async (node, level) => {
//   if (level >= 5) return;
//   console.log("running");
//   await Promise.all(
//     node.children.map(async (child) => {
//       console.log(child);
//       const user = await User.findById(child.id).populate(
//         "referralLinks.approvedUser"
//       );
//       if (!user) return;
//       for (const referral of user.referralLinks) {
//         if (!referral.isUsed) continue;
//         if (!referral.approvedUser) continue;
//         console.log(referral);
//         const nestedUser = await User.findOne({ _id: referral.approvedUser });
//         const grandChild = {
//           name: nestedUser.name,
//           id: referral._id,
//           children: [],
//         };
//         child.children.push(grandChild);
//         populateTree(grandChild, level + 1);
//       }
//     })
//   );
// };

const getUserNetwork = async (req, res) => {
  try {
    const level = 5;

    const queue = [];
    let currentLevel = 0;
    const networkOwner = await User.findById(req.params.id);
    //Replace network array with network tree
    const networkTree = {
      name: networkOwner.name,
      id: networkOwner.id,
      children: [],
    };
    if (!networkOwner) return res.status(401).json("Network doesn't exist.");

    queue.push({ node: networkTree, level: 0 });
    while (queue.length && currentLevel <= level) {
      const { node, level: currentLevel } = queue.shift();
      if (currentLevel >= level) continue;
      const user = await User.findById(node.id);
      if (!user) continue;
      for (const referral of user.referralLinks) {
        if (!referral.isUsed) continue;
        const childUser = await User.findById(referral._id);
        const child = { name: childUser.name, id: childUser.id, children: [] };
        node.children.push(child);
        queue.push({ node: child, level: currentLevel + 1 });
      }
    }
    res.status(200).json(networkTree);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getMyNetwork,
  getUserNetwork,
};
