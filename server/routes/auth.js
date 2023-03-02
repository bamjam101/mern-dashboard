const express = require("express");
const {
  handleUserApproval,
  handleUserLogin,
  handleUserSignUp,
} = require("../controllers/auth");

const router = express.Router();

router.patch("/approve", handleUserApproval);
router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;
