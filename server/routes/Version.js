const express = require("express");
const { addVersion, getAllVersion, delVersion, editVersion, addTitle, addMode, getAllAdTitle, getAllAdMode, editMode, delTitle, editTitle, delMode, addFilter } = require("../controllers/Version");
const router = express.Router();

router.post("/getAllVersion", getAllVersion);
router.post("/addVersion", addVersion);
router.post("/editVersion", editVersion);
router.post("/delVersion", delVersion);

router.post("/getAllAdTitle", getAllAdTitle);
router.post("/addTitle", addTitle);
router.post("/editTitle", editTitle);
router.post("/delTitle", delTitle);

router.post("/getAllAdMode", getAllAdMode);
router.post("/addMode", addMode);
router.post("/editMode", editMode);
router.post("/delMode", delMode);

router.post("/addFilter", addFilter);

module.exports = router;
