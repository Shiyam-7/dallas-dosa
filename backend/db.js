const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongodb successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema(
  {
    username: String,
    roles: Object,
    email: String,
    address: String,
    password: String,
    refreshToken: String,
  },
  { timestamps: true }
);

const AdminSchema = new mongoose.Schema(
  {
    username: String,
    roles: Object,
    email: String,
    address: String,
    password: String,
    refreshToken: String,
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    rating: Number,
    category: String,
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema({
  name: String,
  address: String,
  addressLatLng: {
    lat: String,
    lng: String,
  },
  paymentId: String,
  totalPrice: Number,
  products: Array,
  paymentStatus: { type: String, default: "UNPAID" },
  orderStatus: { type: String, default: "NEW" },
  user: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model("User", UserSchema);
const Admin = mongoose.model("Admin", AdminSchema);
const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  User,
  Admin,
  Product,
  Order,
};
