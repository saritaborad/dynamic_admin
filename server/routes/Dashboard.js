const express = require("express");
const { getDashboard } = require("../controllers/Dashboard");
const router = express.Router();

router.post("/getDashboard", getDashboard);

module.exports = router;
