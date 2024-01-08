const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getOneProduct,
} = require("../controllers/productController");
const verifyRoles = require("../middlewares/verifyRoles");
const rolesList = require("../config/rolesList");

router.get("/", authMiddleware, verifyRoles(rolesList.Admin), getAllProducts);

router.post(
  "/create-product",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  createProduct
);
router.get(
  "/find/:id",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  getOneProduct
);

module.exports = router;
