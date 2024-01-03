const refreshToken = require("../controllers/refreshTokenController");
const router = require("express").Router();

router.get("/", refreshToken);

module.exports = router;
