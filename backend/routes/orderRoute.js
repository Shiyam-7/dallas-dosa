const router = require("express").Router();
const {
  createOrder,
  payForOrder,
  getCurrentOrders,
  orderDelivered,
  newOrderForCurrentUser,
  trackOrder,
} = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/verifyRoles");
const rolesList = require("../config/rolesList");
const Product = require("../db");
const User = require("../db");

router.post(
  "/create",
  authMiddleware,
  verifyRoles(rolesList.User),
  createOrder
);

router.put("/pay", authMiddleware, verifyRoles(rolesList.User), payForOrder);

router.get(
  "/getCurrentOrders",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  getCurrentOrders
);

router.put(
  "/orderDelivered",
  authMiddleware,
  verifyRoles(rolesList.User),
  orderDelivered
);

router.get(
  "/newOrderForCurrentUser",
  authMiddleware,
  verifyRoles(rolesList.User),
  newOrderForCurrentUser
);

router.get(
  "/track-order/:id",
  authMiddleware,
  verifyRoles(rolesList.Admin),
  trackOrder
);

module.exports = router;
