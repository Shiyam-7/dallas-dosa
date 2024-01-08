const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const corsOptions = require("./config/corsOptions");
// const credentials = require("./middlewares/credentials");
const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const refreshTokenRouter = require("./routes/refreshTokenRoute");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/refresh-token", refreshTokenRouter);

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
