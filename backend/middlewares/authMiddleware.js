const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token?.startsWith("Bearer ")) {
      res.sendStatus(401);
    } else {
      const jwtToken = token.split(" ")[1];
      const decoded = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
      if (decoded.UserInfo.username) {
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
      } else {
        res.sendStatus(403);
      }
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired")
      return res.json({ msg: "jwt expired" });
    res.sendStatus(401);
  }
};

module.exports = { authMiddleware };
