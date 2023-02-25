const express = require("express");
const { getUser, getAllUsers } = require("../controllers/users");

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUser);

module.exports = router;
