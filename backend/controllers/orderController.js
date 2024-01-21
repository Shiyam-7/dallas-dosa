const { Order } = require("../db");
// const { orderSchema } = require("../zodSchema");

const newOrder = async (req, res) => {
  try {
    // console.log(req.body);
    // const validatedRequest = orderSchema.safeParse(req.body);
    // if (!validatedRequest.success) {
    //   return res.status(400).json({
    //     msg: "Invalid" + " " + validatedRequest.error.issues[0].path[0] + "!",
    //   });
    // }
    const new_order = await Order.create(req.body);
    if (!new_order) {
      return res.status(500).json({
        msg: "Order cannot be placed at the moment!. Please try again after sometime.",
      });
    }
    res.status(200).send(new_order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};

const payment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ msg: "Payment Id is required!" });
    }
    const order = await Order.findOne({ username: req.user });
    if (!order) {
      return res.status(404).json({ msg: "Order not found!" });
    }
    order.paymentId = paymentId;
    order.paymentStatus = "PAID";
    await order.save();
    res.status(200).send(order._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};

const getCurrentOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      paymentStatus: "PAID",
      orderStatus: "NEW",
    });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};
const orderDelivered = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.body._id,
    });
    if (!order) {
      return res.status(404).json("Order Not Found!");
    }
    order.orderStatus = "DELIVERED";
    await order.save();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};
const newOrderForCurrentUser = async (req, res) => {
  try {
    const order = await Order.findOne({
      username: req.user,
      orderStatus: "NEW",
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};
const trackOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ msg: "Id is required!" });
    }
    const order = await Order.findById({ _id: id });
    if (!order) {
      return res.status(404).json({ msg: "Order not found!" });
    }
    if (req.user !== order.username) {
      return res.sendStatus(403);
    }
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Oops!! Something went wrong!" });
  }
};

module.exports = {
  newOrder,
  payment,
  getCurrentOrders,
  orderDelivered,
  newOrderForCurrentUser,
  trackOrder,
};
