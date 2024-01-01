const mongoose = require("mongoose");
// require("dotenv").config();

mongoose.connect(process.env.MONGO);

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  rating: Number,
  category: String,
});

const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Product = mongoose.model("Product", ProductSchema);

module.exports = {
  User,
  Admin,
  Product,
};
