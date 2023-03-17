const express = require("express");
const {
  getAllWithdrawalRequests,
  postWithdrawalRequest,
  withdrawalApproval,
  withdrawalRejection,
} = require("../controllers/withdraw");
const protect = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/all", protect, getAllWithdrawalRequests);
router.delete("/approve/:id", protect, withdrawalApproval);
router.post("/", protect, postWithdrawalRequest);
router.delete("/reject/:id", protect, withdrawalRejection);

module.exports = router;
