const express = require("express");
const {
  handleRegistrantApproval,
  handleUserLogin,
} = require("../controllers/auth");

const router = express.Router();

router.post("/approve", handleRegistrantApproval);

router.post("/login", handleUserLogin);

module.exports = router;
