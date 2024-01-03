const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
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
    res.sendStatus(401);
  }
};

module.exports = { authMiddleware };
