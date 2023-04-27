const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const give_response = require("../middleware/help");

router.post("/upload", upload.single("image"), (req, res) => {
 let imgPath = req.body?.folderName ? `${process.env.BACKEND_LOCAL_URL}/dynamic_admin/images/${req.body?.folderName + "/" + req.file?.filename}` : `${process.env.BACKEND_LOCAL_URL}/dynamic_admin/images/${req.file.filename}`;

 return give_response(res, 200, true, "image uploaded", { imgUrl: imgPath });
});

module.exports = router;
