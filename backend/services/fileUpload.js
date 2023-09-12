const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    const folderPath = "../uploads/" + (req.body.folderName || "");
    fs.mkdirSync(folderPath, { recursive: true });
    return cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
