const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

router.post("/upload", upload.single("image"), (req, res) => {
 return give_response(res, 200, true, "image uploaded", { image: `/uploads/${req.file.originalname}` });
});

module.exports = router;
