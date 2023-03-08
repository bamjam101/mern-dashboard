const express = require("express");
const {
  getUserReferrals,
  getMyReferrals,
} = require("../controllers/referrals");
const protect = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/me", protect, getMyReferrals);
router.get("/:id", protect, getUserReferrals);

module.exports = router;
