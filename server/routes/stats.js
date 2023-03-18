const express = require("express");
const {
  getUserStats,
  getInvestmentStats,
  getWithdrawalRequestStats,
  getRegistrantsStats,
  getMyNetworkLength,
} = require("./../controllers/stats");
const protect = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/users", protect, getUserStats);
router.get("/investments", protect, getInvestmentStats);
router.get("/withdrawal-requests", protect, getWithdrawalRequestStats);
router.get("/registrants", protect, getRegistrantsStats);
router.get("/level-length", protect, getMyNetworkLength);

module.exports = router;
