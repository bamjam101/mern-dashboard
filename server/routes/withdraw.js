const express = require("express");
const {
  postWithdrawRequest,
  getAllWithdrawalRequests,
} = require("../controllers/withdraw");
const protect = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", protect, getAllWithdrawalRequests);
router.post("/me", protect, postWithdrawRequest);

module.exports = router;
