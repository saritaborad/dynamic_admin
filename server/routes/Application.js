const express = require("express");
const { addApp, updateApp, getAllApp, deleteApp, updatePosition } = require("../controllers/Application");
const router = express.Router();

router.post("/getAllApp", getAllApp);
router.post("/addApp", addApp);
router.post("/updateApp", updateApp);
router.post("/deleteApp", deleteApp);
router.post("/updatePosition", updatePosition);

module.exports = router;
