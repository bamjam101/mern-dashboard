const express = require("express");
const { handleUserLogin, handleUserSignUp } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;
