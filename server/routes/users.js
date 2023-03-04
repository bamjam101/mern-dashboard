const express = require("express");
const {
  getUser,
  getAllUsers,
  getUnapprovedUsers,
  handleEmailVerification,
  handlePasswordChangeOTPGeneration,
  handlePasswordReset,
} = require("../controllers/users");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.get("/registrants/all", getUnapprovedUsers);
router.get("/:id/verify/:token", handleEmailVerification);
router.post("/forgot-password", handlePasswordChangeOTPGeneration);
router.post("/:id/reset-password/:token", handlePasswordReset);

module.exports = router;
