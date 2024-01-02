const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const refreshToken = require("./controllers/refreshToken.controller");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.get("/", async (req, res) => {
  res.send("hi");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Oops!! Something went wrong!");
});

app.listen(process.env.PORT, () =>
  console.log("Server has been started successfully!")
);
