const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
// const productRouter = require("./routes/product");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.json("Hello");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Oops!! Something went wrong!");
});

app.listen(process.env.PORT, () =>
  console.log("Server has been started successfully!")
);
