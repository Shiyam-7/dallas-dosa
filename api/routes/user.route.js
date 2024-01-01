const router = require("express").Router();
const { signup, login } = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user");

router.post("/signup", userMiddleware, signup);
router.post("/login", userMiddleware, login);

module.exports = router;
