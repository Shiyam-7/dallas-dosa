const { Admin } = require("../db/index");
const zod = require("zod");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupSchema = zod.object({
  username: zod.string().min(1).max(50),
  email: zod.string().email(),
  password: zod.string().min(8),
});

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

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
      const isExists = await Admin.findOne({ email });

      if (isExists) {
        res.send("Admin already exists!");
      } else {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newAdmin = await Admin.create({
          username,
          email,
          password: hashedPassword,
        });
        if (newAdmin) {
          console.log(newAdmin);
          res.send("Admin created successfully!");
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
      const isExists = await Admin.findOne({ email });

      if (!isExists) {
        res.send("Admin not found");
      } else {
        const validPassword = bcryptjs.compareSync(password, isExists.password);
        if (!validPassword) {
          res.send("Invalid password!");
        } else {
          const token = jwt.sign(
            { id: isExists._id, type: "admin" },
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
