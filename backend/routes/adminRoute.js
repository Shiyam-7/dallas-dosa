const router = require("express").Router();
const { adminMiddleware } = require("../middlewares/authMiddleware");
const { signup, login, logout } = require("../controllers/authAdminController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
