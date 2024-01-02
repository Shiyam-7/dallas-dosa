const jwt = require("jsonwebtoken");
const { User } = require("../db");

const refreshToken = async (req, res, next) => {
  console.log(req.cookies);
  const cookies = req.cookies;
  if (!cookies || !cookies.refreshToken) {
    res.sendStatus(401);
  } else {
    const refreshToken = cookies.refreshToken;
    console.log(refreshToken);
    const isExists = await User.findOne({ refreshToken });
    console.log(isExists);
    if (!isExists) {
      res.sendStatus(403);
    } else {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (decoded.username !== isExists.username) {
        res.sendStatus(403);
      } else {
        const accessToken = jwt.sign(
          decoded.username,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10m" }
        );
        res.status(200).json({ accessToken });
      }
    }
  }
};

module.exports = refreshToken;
