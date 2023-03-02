const express = require("express");
const {
  getUser,
  getAllUsers,
  getUnapprovedUsers,
} = require("../controllers/users");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.get("/registrants/all", getUnapprovedUsers);

module.exports = router;
