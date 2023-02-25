const express = require("express");
const {
  handleRegistrantSignUp,
  handleRegistrantApproval,
  handleUserLogin,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", handleRegistrantSignUp);

router.post("/approve", handleRegistrantApproval);

router.post("/login", handleUserLogin);

module.exports = router;
