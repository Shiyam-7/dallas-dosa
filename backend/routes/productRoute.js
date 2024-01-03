const router = require("express").Router();
const {
  adminMiddleware,
  userMiddleware,
} = require("../middlewares/authMiddleware");
const getCategory = require("../controllers/productController");
const verifyRoles = require("../middlewares/verifyRoles");
const rolesList = require("../config/rolesList");

router.get(
  "/category",
  userMiddleware,
  verifyRoles(rolesList.User),
  getCategory
);

module.exports = router;
