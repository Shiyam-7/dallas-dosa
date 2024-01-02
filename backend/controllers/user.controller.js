const { User } = require("../db");
const { signupSchema, loginSchema } = require("../zodSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const validatedRequest = signupSchema.safeParse({
      username,
      email,
      password,
    });

    if (validatedRequest.success) {
      const isExists = await User.findOne({ email });

      if (isExists) {
        res.send("User already exists!");
      } else {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        if (newUser) {
          res.send("User created successfully!");
        } else {
          res.send("Unexpected error!");
        }
      }
    } else {
      res.send(
        "Invalid" + " " + validatedRequest.error.issues[0].path[0] + "!"
      );
    }
    /*   + " " + validatedRequest.error.issues[0].message */
  } catch (error) {
    console.log(error);
    res.json({ msg: "Incorrect inputs!" });
  }
};
const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const validatedRequest = loginSchema.safeParse({ email, password });
    if (validatedRequest.success) {
      const isExists = await User.findOne({ email });

      if (!isExists) {
        res.send("User not found");
      } else {
        const validPassword = bcryptjs.compareSync(password, isExists.password);
        if (!validPassword) {
          res.send("Invalid password!");
        } else {
          const token = jwt.sign(
            { id: isExists._id, type: "user" },
            process.env.JWT_SECRET
          );
          res.send(`Bearer ${token}`);
        }
      }
    } else {
      res.send(
        "Invalid" + " " + validatedRequest.error.issues[0].path[0] + "!"
      );
    }
    /*   + " " + validatedRequest.error.issues[0].message */
  } catch (error) {
    console.log(error);
    res.json({ msg: "Incorrect inputs!" });
  }
};

module.exports = { signup, login };
