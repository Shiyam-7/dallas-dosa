const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      res.status(401).json({ msg: "Unauthenticated!" });
    }
    if (token && token.startsWith("Bearer ")) {
      const jwtToken = token.split(" ")[1];
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
      if (decoded.username && decoded.type == "user") {
        next();
      } else {
        res.status(403).json({ msg: "Unauthorized!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Incorrect inputs!" });
  }
};

module.exports = userMiddleware;
