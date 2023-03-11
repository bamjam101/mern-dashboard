const express = require("express");
const {
  getAllWithdrawalRequests,
  postWithdrawalRequest,
  withdrawalApproval,
} = require("../controllers/withdraw");
const protect = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", protect, getAllWithdrawalRequests);
router.patch("/:id", protect, withdrawalApproval);
router.post("/", protect, postWithdrawalRequest);

module.exports = router;
