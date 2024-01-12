const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/productController");
const verifyRoles = require("../middlewares/verifyRoles");
const rolesList = require("../config/rolesList");

router.get("/", getProducts);

router.post(
  "/create-product",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  createProduct
);

router.delete(
  "/delete-product",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  deleteProduct
);

module.exports = router;
