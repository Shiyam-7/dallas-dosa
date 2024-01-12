const { productSchema } = require("../zodSchema");
const { Product } = require("../db");

const createProduct = async (req, res) => {
  try {
    const validatedRequest = productSchema.safeParse(req.body);
    if (!validatedRequest.success) {
      return res.status(400).json({
        msg: "Invalid" + " " + validatedRequest.error.issues[0].path[0] + "!",
      });
    }
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageLink: req.body.imageLink,
      rating: req.body.rating,
      category: req.body.category,
    });
    if (!newProduct) {
      return res.status(500).json({
        msg: "Product cannot be created at the moment!. Please try again after sometime.",
      });
    }
    res.status(200).json({ msg: "Product created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Incorrect inputs!" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ msg: "Id is required!" });
  }
  try {
    const deleteSuccess = await Product.findByIdAndDelete({ _id: id });
    if (!deleteSuccess) {
      return res.status(404).json({ msg: "Product not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {

    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
};
