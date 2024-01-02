const { Admin } = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../zodSchema");

const signup = async (req, res) => {
  try {
    const validatedRequest = signupSchema.safeParse(req.body);
    if (validatedRequest.success) {
      const isExists = await Admin.findOne({ email: req.body.email });

      if (isExists) {
        res.status(400).json({ msg: "Admin already exists!" });
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
      res.status(400).json({
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
      const isExists = await Admin.findOne({ email: req.body.email });

      if (!isExists) {
        res.status(404).json({ msg: "Admin not found" });
      } else {
        const validPassword = bcryptjs.compareSync(
          req.body.password,
          isExists.password
        );
        if (!validPassword) {
          res.send("Invalid password!");
        } else {
          const token = jwt.sign(
            { id: isExists._id, type: "admin" },
            process.env.JWT_SECRET
          );
          res
            .status(200)
            .cookie("access_token", token, {
              httpOnly: true,
              maxAge: 2 * 60 * 60 * 1000,
            })
            .json({ msg: "Success!" });
        }
      }
    } else {
      res.status(400).json({
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
