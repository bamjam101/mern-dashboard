const express = require("express");
const {
  getMyNetwork,
  getUserNetwork,
  getAllNetwork,
} = require("../controllers/networks");
const router = express.Router();

const protect = require("../middlewares/jwtAuth");

router.get("/me", protect, getMyNetwork);
router.get("/:id", protect, getUserNetwork);

module.exports = router;
