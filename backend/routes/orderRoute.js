const router = require("express").Router();
const {
  newOrder,
  payment,
  getCurrentOrders,
  orderDelivered,
  newOrderForCurrentUser,
  trackOrder,
  orderHistory,
} = require("../controllers/orderController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const verifyRoles = require("../middlewares/verifyRoles");
const rolesList = require("../config/rolesList");
const Product = require("../db");
const User = require("../db");

router.post(
  "/new-order",
  authMiddleware,
  verifyRoles(rolesList.User),
  newOrder
);

router.patch("/payment", authMiddleware, verifyRoles(rolesList.User), payment);

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
  verifyRoles(rolesList.User),
  trackOrder
);
router.get(
  "/order-history/:id",
  authMiddleware,
  verifyRoles(rolesList.User),
  orderHistory
);

module.exports = router;
