const router = require("express").Router();
const {
  signup,
  login,
  logout,
  googleAuth,
} = require("../controllers/authController");
const refreshToken = require("../controllers/refreshTokenController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);
router.get("/refresh", refreshToken);

module.exports = router;
