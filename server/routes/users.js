const express = require("express");
const {
  getUser,
  getAllUsers,
  getUnapprovedUsers,
  handleEmailVerification,
  handlePasswordChangeOTPGeneration,
  handlePasswordReset,
  getUserReferrals,
} = require("../controllers/users");

const router = express.Router();

router.get("/:id", getUser);
router.get("/all", getAllUsers);

router.get("/registrants/all", getUnapprovedUsers);

router.get("/:id/verify/:token", handleEmailVerification);

router.post("/forgot-password", handlePasswordChangeOTPGeneration);
router.post("/:id/reset-password/:token", handlePasswordReset);

router.get("/:id/referrals", getUserReferrals);

module.exports = router;
