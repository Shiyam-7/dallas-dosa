const router = require("express").Router();
const adminMiddleware = require("../middlewares/admin");
const { signup, login } = require("../controllers/admin.controller");

router.post("/signup", adminMiddleware, signup);
router.post("/login", adminMiddleware, login);

module.exports = router;
