const express = require("express");
const { addVersion, getAllVersion } = require("../controllers/Version");
const router = express.Router();

router.post("/addVersion", addVersion);
router.post("/getAllVersion", getAllVersion);

module.exports = router;
