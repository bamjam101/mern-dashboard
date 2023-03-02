const express = require("express");
const {
  getUser,
  getAllUsers,
  getUnapprovedUsers,
  handleEmailVerification,
} = require("../controllers/users");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.get("/registrants/all", getUnapprovedUsers);
router.get("/:id/verify/:token", handleEmailVerification);

module.exports = router;
