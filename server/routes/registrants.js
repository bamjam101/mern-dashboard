const express = require("express");
const { getAllRegistrants } = require("../controllers/registrant");

const router = express.Router();

router.get("/all", getAllRegistrants);

module.exports = router;
