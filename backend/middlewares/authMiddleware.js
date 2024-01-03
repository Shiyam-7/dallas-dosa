const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.sendStatus(401);
    }
    if (token && token.startsWith("Bearer ")) {
      const jwtToken = token.split(" ")[1];
      const decoded = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
      if (decoded.username) {
        req.user = decoded.username;
        next();
      } else {
        res.sendStatus(403);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const userMiddleware = (req, res, next) => {
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
        console.log("if");
        res.sendStatus(403);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = { adminMiddleware, userMiddleware };
