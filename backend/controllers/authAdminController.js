const { Admin } = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../zodSchema");

const signup = async (req, res) => {
  try {
    const validatedRequest = signupSchema.safeParse(req.body);
    if (validatedRequest.success) {
      const isExists = await Admin.findOne({
        email: req.body.email,
        username: req.body.username,
      });

      if (isExists) {
        res.status(409).json({ msg: "Admin already exists!" });
      } else {
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        const newAdmin = await Admin.create({
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          password: hashedPassword,
        });
        if (!newAdmin) {
          res
            .status(500)
            .json({ msg: "Oops!! Something went wrong on our side!" });
        } else {
          res.status(200).json({ msg: "Admin created successfully!" });
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

const login = async (req, res, next) => {
  try {
    const validatedRequest = loginSchema.safeParse(req.body);
    if (validatedRequest.success) {
      const isExists = await Admin.findOne({
        email: req.body.email,
        username: req.body.username,
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
          const accessToken = jwt.sign(
            { username: isExists.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
          );
          const refreshToken = jwt.sign(
            { username: isExists.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          const updateAdmin = { refreshToken, ...isExists._doc };
          console.log(updateAdmin);
          const loggedIn = await Admin.findOneAndUpdate(
            { username: isExists.username },
            updateAdmin,
            { new: true }
          );

          if (!loggedIn) {
            res
              .status(500)
              .json({ msg: "Oops!! Something wrong on our side!" });
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

module.exports = { signup, login };
