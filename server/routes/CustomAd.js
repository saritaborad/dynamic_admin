const express = require("express");
const router = express.Router();
const { getAllCustomAd, delCustomAd, editCustomAd, addCustomAd, delBanner, updateBanner, addBanner, getAllBanner } = require("../controllers/CustomAd");

router.post("/getAllCustomAd", getAllCustomAd);
router.post("/addCustomAd", addCustomAd);
router.post("/editCustomAd", editCustomAd);
router.post("/delCustomAd", delCustomAd);

router.post("/getAllBanner", getAllBanner);
router.post("/addBanner", addBanner);
router.post("/updateBanner", updateBanner);
router.post("/delBanner", delBanner);

module.exports = router;
