const express = require("express");
const { handleRegistrantSignUp } = require("../controllers/auth");
const { getAllRegistrants } = require("../controllers/registrant");

const router = express.Router();

router.get("/all", getAllRegistrants);
router.post("/signup", handleRegistrantSignUp);

module.exports = router;
