const express = require("express");
const Registrant = require("../models/Registrant");
const User = require("../models/User");

const router = express.Router();

router.get("/registrants", async (req, res) => {
  try {
    const registrants = await Registrant.findMany();
    const { password, ...others } = registrants._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(200).json("No user of such sort");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
