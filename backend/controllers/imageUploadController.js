const router = require("express").Router();
const multer = require("multer");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/verifyRoles");
const rolesList = require("../config/rolesList");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage });

router.post(
  "/image",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  upload.single("image"),
  (req, res) => {
    try {
      return res.status(201).json({ msg: "Successfully uploaded the image!" });
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
