const { User } = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../zodSchema");

const signup = async (req, res) => {
  try {
    const validatedRequest = signupSchema.safeParse(req.body);
    if (validatedRequest.success) {
      const emailExists = await User.findOne({
        email: req.body.email,
      });
      const usernameExists = await User.findOne({
        username: req.body.username,
      });
      if (emailExists || usernameExists) {
        res.status(409).json({ msg: "User already exists!" });
      } else {
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        const newUser = await User.create({
          username: req.body.username,
          roles: { User: 2001 },
          email: req.body.email,
          address: req.body.address,
          password: hashedPassword,
        });
        if (!newUser) {
          res
            .status(500)
            .json({ msg: "Oops!! Something went wrong on our side!" });
        } else {
          const { password, roles, ...userInfo } = newUser._doc;
          res.status(200).json({ msg: "User created successfully!", userInfo });
        }
      }
    } else {
      res.status(401).json({
        msg: "Invalid" + " " + validatedRequest.error.issues[0].path[0] + "!",
      });
    }
    /*   + " " + validatedRequest.error.issues[0].message */
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Incorrect inputs!" });
  }
};
const login = async (req, res) => {
  try {
    const validatedRequest = loginSchema.safeParse(req.body);
    if (validatedRequest.success) {
      const isExists = await User.findOne({
        email: req.body.email,
      });

      if (!isExists) {
        res.status(401).json({ msg: "Unauthenticated!" });
      } else {
        const validPassword = bcryptjs.compareSync(
          req.body.password,
          isExists.password
        );
        if (!validPassword) {
          res.status(401).json({ msg: "Invalid password!" });
        } else {
          const roles = Object.values(isExists.roles);
          const accessToken = jwt.sign(
            { UserInfo: { username: isExists.username, roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
          );
          const refreshToken = jwt.sign(
            { username: isExists.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          const loginUser = await User.findOneAndUpdate(
            { username: isExists.username },
            { ...isExists._doc, refreshToken },
            { new: true }
          );

          if (!loginUser) {
            res
              .status(500)
              .json({ msg: "Oops!! Something went wrong on our side!" });
          } else {
            const { password, roles, refreshToken, ...userInfo } =
              isExists._doc;
            console.log("1");
            res
              .status(200)
              .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
              })
              .json({ accessToken, userInfo });
          }
        }
      }
    } else {
      res.status(401).json({
        msg: "Invalid" + " " + validatedRequest.error.issues[0].path[0] + "!",
      });
    }
    /*   + " " + validatedRequest.error.issues[0].message */
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Incorrect inputs!" });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      console.log("!cookies?.refreshToken");
      res.sendStatus(204);
    } else {
      console.log("else");
      const refreshToken = cookies.refreshToken;
      const isExists = await User.findOne({ refreshToken });
      if (!isExists) {
        console.log("!isExists");
        res
          .clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .sendStatus(204);
      } else {
        console.log("else");
        const updateUser = await User.findOneAndUpdate(
          { refreshToken },
          { ...isExists._doc, refreshToken: "" },
          { new: true }
        );
        if (!updateUser) {
          console.log("!updateUser");
          res
            .status(500)
            .json({ msg: "Oops!! Something went wrong on our side!" });
        } else {
          console.log("else");
          res
            .clearCookie("refreshToken", {
              httpOnly: true,
              sameSite: "None",
              secure: true,
            })
            .sendStatus(204);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Incorrect inputs!" });
  }
};
module.exports = { signup, login, logout };
