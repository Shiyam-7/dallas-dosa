const router = require("express").Router();
const {
  adminMiddleware,
  userMiddleware,
} = require("../middlewares/authMiddleware");
const getCategory = require("../controllers/productController");

router.get("/category", userMiddleware, getCategory);

module.exports = router;
