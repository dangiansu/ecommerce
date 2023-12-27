const multer = require("multer");
const path = require("path");

const upload = (fieldName) => async (req, res, next) => {
  try {
      const storage = multer.diskStorage({
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
        },
      });
      var maxSize = 1 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
      const uploadMiddleware = multer({
        storage: storage,
        limits: { fileSize: maxSize },
        fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png|gif/;
          const mimeType = fileTypes.test(file.mimetype);
          const extname = fileTypes.test(path.extname(file.originalname));
          if (mimeType && extname) {
            return cb(null, true);
          }
          cb("Please provide proper file format to upload");
        },
      }).array(fieldName);

      uploadMiddleware(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err });
        }
        next();
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

module.exports = { upload };
