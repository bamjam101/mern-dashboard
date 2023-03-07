const express = require("express");
const {
  getMe,
  getUser,
  getAllUsers,
  getUnapprovedUsers,
  handleEmailVerification,
  handlePasswordChangeOTPGeneration,
  handlePasswordReset,
  getUserReferrals,
} = require("../controllers/users");

const protect = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/:id", protect, getUser);
router.get("/all", protect, getAllUsers);

router.get("/registrants/all", protect, getUnapprovedUsers);

router.get("/:id/verify/:token", handleEmailVerification);

router.post("/forgot-password", handlePasswordChangeOTPGeneration);
router.post("/:id/reset-password/:token", handlePasswordReset);

router.get("/:id/referrals", getUserReferrals);

module.exports = router;
