const express = require("express");
const { getMyWallet, getUserWallet } = require("../controllers/wallet");
const protect = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/me", protect, getMyWallet);
router.get("/:id", protect, getUserWallet);

module.exports = router;
