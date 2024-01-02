const router = require("express").Router();
const adminMiddleware = require("../middlewares/admin");
const { signup, login } = require("../controllers/admin.controller");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
