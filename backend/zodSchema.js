const zod = require("zod");

const signupSchema = zod.object({
  username: zod.string().min(1).max(50),
  email: zod.string().email().max(100),
  address: zod.string().min(1).max(500),
  password: zod.string().min(8).max(200),
});

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

const productSchema = zod.object({
  title: zod.string().min(1).max(50),
  description: zod.string().min(1).max(1000),
  price: zod.number().nonnegative(),
  imageLink: zod.string().min(1),
  rating: zod.number().nonnegative(),
  category: zod.string().min(1).max(50),
});

module.exports = { signupSchema, loginSchema, productSchema };
