const express = require("express");
const {
  getAllWithdrawalRequests,
  postWithdrawalRequest,
} = require("../controllers/withdraw");
const protect = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", protect, getAllWithdrawalRequests);
router.post("/", protect, postWithdrawalRequest);

module.exports = router;
