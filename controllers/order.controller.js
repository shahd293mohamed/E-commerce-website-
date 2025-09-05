// const Order = require("../models/order.model");



// exports.createOrder = async (req, res) => {
//     try {
//         const orderStatus = await OrderStatus.create(req.body);
//         res.status(201).json({ message: "orderStatus created", orderStatus });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getAllOrder = async (req, res) => {
//     try {
//         const orderStatus = await OrderStatus.find();
//         res.status(200).json({ message: "All orderStatus", orderStatus });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.getOrderById = async (req, res) => {
//     try {
//         const orderStatus = await OrderStatus.findById(req.params.id);
//         res.status(200).json(orderStatus);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { statusOfOrder, cancletionReason } = req.body;

//     const order = await OrderStatus.findById(req.params.id);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     order.statusOfOrder = statusOfOrder || order.statusOfOrder;
//     if (statusOfOrder === "cancelled" && cancletionReason) {
//       order.cancletionReason = cancletionReason;
//     }

//     const updatedOrder = await order.save();
//     res.status(200).json({message: "Order status updated", order: updatedOrder });
//   } catch (error) {
//     res.status(500).json({message : "error in updating order status", error: err.message});
//   }
// };



const Order = require("../models/order.model");
const {Cart, CartItem} = require("../models/cart.model");


// Create order from cart
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const items = await CartItem.find({ cart: cart._id }).populate("product");
    if (!items.length) return res.status(400).json({ message: "Cart is empty" });

    // Prepare order items
    const orderItems = items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtTimeOfOrder: item.product.price // ✅ take current price
    }));

        const totalPrice = items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
        }, 0);



    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice
    });

    await order.save();

    // Optionally clear cart
    await CartItem.deleteMany({ cart: cart._id });

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product").populate({
      path: "user",
      select: "name email phone address"
    });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product user");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { statusOfOrder, cancletionReason, cancelldBywho } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.statusOfOrder = statusOfOrder || order.statusOfOrder;
    if (statusOfOrder === "cancelled") {
      order.cancletionReason = cancletionReason;
      order.cancelldBywho = cancelldBywho || "user";
    }

    await order.save();
    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getorderByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


