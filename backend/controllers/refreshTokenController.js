const jwt = require("jsonwebtoken");
const { User } = require("../db");

const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
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
            { username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
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
