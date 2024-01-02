const router = require("express").Router();
const { adminMiddleware } = require("../middlewares/authMiddleware");
const { signup, login } = require("../controllers/authAdminController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
