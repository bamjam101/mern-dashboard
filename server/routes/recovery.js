const express = require("express");
const {
  handlePasswordChangeOTPGeneration,
  handlePasswordReset,
} = require("../controllers/recovery");
const router = express.Router();

router.post("/forgot-password", handlePasswordChangeOTPGeneration);
router.post("/:id/reset-password/:token", handlePasswordReset);

module.exports = router;
