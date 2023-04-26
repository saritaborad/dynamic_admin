const express = require("express");
const router = express.Router();
const { getAllCustomAd, delCustomAd, editCustomAd, addCustomAd } = require("../controllers/CustomAd");

router.post("/addCustomAd", addCustomAd);
router.post("/editCustomAd", editCustomAd);
router.post("/delCustomAd", delCustomAd);
router.post("/getAllCustomAd", getAllCustomAd);

module.exports = router;
