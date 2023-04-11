const express = require("express");
const { addVersion, getAllVersion, delVersion, editVersion, addTitle, addMode } = require("../controllers/Version");
const router = express.Router();

router.post("/addVersion", addVersion);
router.post("/getAllVersion", getAllVersion);
router.post("/delVersion", delVersion);
router.post("/editVersion", editVersion);

router.post("/addTitle", addTitle);
router.post("/addMode", addMode);

module.exports = router;
