const express = require("express");
const {
  getMe,
  getUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/users");

const protect = require("../middlewares/jwtAuth");

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/all", protect, getAllUsers);
router.get("/:id", protect, getUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
