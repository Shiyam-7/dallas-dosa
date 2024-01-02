const router = require("express").Router();
const { signup, login } = require("../controllers/authUserController");
const { userMiddleware } = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
