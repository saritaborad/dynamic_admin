const multer = require("multer");

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads/");
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + "-" + file.originalname);
 },
});

const upload = multer({ storage: storage });

// use app.post('/upload', upload.single('image')) => to upload single field
// upload.fields([{ name: 'image' }, { name: 'name' }]) => to upload multiple field
module.exports = upload;
