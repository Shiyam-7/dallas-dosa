const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { signup, login, logout } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
