const multer = require("multer");
const fs = require("fs");
const { getTimeStamp } = require("../utils");

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  const folderName = req.body?.folderName || "/";
  const folderPath = `dynamic_admin/images/${folderName}`;
  if (!fs.existsSync(folderPath)) {
   fs.mkdirSync(folderPath, { recursive: true });
  }
  cb(null, folderPath);
 },
 filename: function (req, file, cb) {
  const prefix = req.body?.imgPrefix || "";
  const ext = file.originalname?.split(".")?.pop();
  cb(null, `${prefix}${getTimeStamp()}.${ext}`);
 },
});

const upload = multer({ storage: storage });

module.exports = upload;
