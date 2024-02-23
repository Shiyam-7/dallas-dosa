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
            .json({ msg: "Oops!! Something went wrong! Please try again." });
        } else {
          const { password, roles, ...userInfo } = newUser._doc;
          res.status(201).json({ msg: "User created successfully!", userInfo });
        }
      }
    } else {
      res.status(400).json({
        msg: "Invalid Email or Password!",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Oops!! Something went wrong! Please try again." });
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
        res.status(404).json({ msg: "No User Found!" });
      } else {
        const validPassword = bcryptjs.compareSync(
          req.body.password,
          isExists.password
        );
        if (!validPassword) {
          res.status(401).json({ msg: "Incorrect password!" });
        } else {
          const roles = Object.values(isExists.roles);
          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: isExists.username,
                email: isExists.email,
                roles,
                address: isExists.address,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
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
            res.status(500).json({
              msg: "Oops!! Something went wrong! Please try again.",
            });
          } else {
            res
              .status(200)
              .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
              })
              .json({ accessToken });
          }
        }
      }
    } else {
      res.status(400).json({
        msg: "Invalid Email or Password!",
      });
    }
    /*   + " " + validatedRequest.error.issues[0].message */
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Oops!! Something went wrong! Please try again." });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      res.sendStatus(204);
    } else {
      const refreshToken = cookies.refreshToken;
      const isExists = await User.findOne({ refreshToken });
      if (!isExists) {
        res
          .clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .sendStatus(204);
      } else {
        const updateUser = await User.findOneAndUpdate(
          { refreshToken },
          { ...isExists._doc, refreshToken: "" },
          { new: true }
        );
        if (!updateUser) {
          res
            .status(500)
            .json({ msg: "Oops!! Something went wrong on our side!" });
        } else {
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
    res
      .status(500)
      .json({ msg: "Oops!! Something went wrong! Please try again." });
  }
};

const googleAuth = async (req, res) => {
  const { email, username } = req.body;
  try {
    const emailExists = await User.findOne({
      email,
    });
    const usernameExists = await User.findOne({
      username,
    });
    if (emailExists || usernameExists) {
      const roles = Object.values(emailExists.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: emailExists.username,
            email: emailExists.email,
            roles,
            address: emailExists.address,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { username: emailExists.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const loginUser = await User.findOneAndUpdate(
        { username: emailExists.username },
        { ...emailExists._doc, refreshToken },
        { new: true }
      );

      if (!loginUser) {
        res.status(500).json({
          msg: "Oops!! Something went wrong! Please try again.",
        });
      } else {
        res
          .status(200)
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .json({ accessToken });
      }
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        roles: { User: 2001 },
        email,
        address: req.body.address,
        password: hashedPassword,
      });
      if (!newUser) {
        res
          .status(500)
          .json({ msg: "Oops!! Something went wrong! Please try again." });
      } else {
        const { password, roles, ...userInfo } = newUser._doc;
        res.status(201).json({ msg: "User created successfully!", userInfo });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Oops!! Something went wrong! Please try again." });
  }
};
module.exports = { signup, login, logout, googleAuth };
