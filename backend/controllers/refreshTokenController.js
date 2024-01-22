const jwt = require("jsonwebtoken");
const { User } = require("../db");

const refreshToken = async (req, res) => {
  try {
    console.log(req.cookies);
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      res.sendStatus(401);
    } else {
      const refreshToken = cookies.refreshToken;
      const isExists = await User.findOne({ refreshToken });
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
          const roles = Object.values(isExists.roles);
          const accessToken = jwt.sign(
            { UserInfo: { username: decoded.username, roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
          );
          res.status(200).json({ accessToken });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = refreshToken;
