const express = require("express");

const router = express.Router();

const eventc = require("../controller/calenderController");

router.get("/", eventc.eventget).post("/", eventc.eventadd);

module.exports = router;
