const express = require("express");
const {
  handleUserApproval,
  getUnapprovedUsers,
} = require("../controllers/registrants");
const protect = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/", protect, getUnapprovedUsers);
router.patch("/:id", handleUserApproval);

module.exports = router;
