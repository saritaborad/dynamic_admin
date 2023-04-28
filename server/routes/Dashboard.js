const express = require("express");
const { getDashboard, getInstallTrack } = require("../controllers/Dashboard");
const router = express.Router();

router.post("/getDashboard", getDashboard);
router.post("/getInstallTrack", getInstallTrack);

module.exports = router;
