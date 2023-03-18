const express = require("express");
const {
  getTransactions,
  getMyTransaction,
  getUserTransaction,
} = require("../controllers/transactions");
const router = express.Router();
const protect = require("../middlewares/jwtAuth");

router.get("/", protect, getTransactions);
router.get("/me", protect, getMyTransaction);
router.get("/:id", protect, getUserTransaction);

module.exports = router;
