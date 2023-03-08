const express = require("express");
const {
  handleUserLogin,
  handleUserSignUp,
  handleEmailVerification,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/:id/verify/:token", handleEmailVerification);

module.exports = router;
