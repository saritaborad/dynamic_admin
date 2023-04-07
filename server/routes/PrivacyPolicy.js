const express = require("express");
const { changePolicy, getPolicy } = require("../controllers/PrivacyPolicy");
const router = express.Router();

router.post("/changePolicy", changePolicy);
router.post("/getPolicy", getPolicy);

module.exports = router;
