const { z } = require("zod");

const signupSchema = z.object({
  username: z.string().min(1).max(50),
  email: z.string().email().max(100),
  address: z.string().min(1).max(500),
  password: z.string().min(8).max(200),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const productSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(1000),
  price: z.number().nonnegative(),
  imageLink: z.string().min(1),
  rating: z.number().nonnegative(),
  category: z.string().min(1).max(50),
});

// const orderSchema = z.object({
//   username: z.string().min(1).max(50),
//   address: z.string().min(1).max(500),
//   addressLatLng: z.object({
//     lat: z.number(),
//     lng: z.number(),
//   }),
//   totalPrice: z.number().nonnegative(),
//   products: z.array(),
// });

module.exports = { signupSchema, loginSchema, productSchema };
