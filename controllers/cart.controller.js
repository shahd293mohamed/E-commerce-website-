// // controllers/cartController.js
// const Cart = require("../models/cart.model");
// const Product = require("../models/products.model");

// exports.addToCart = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });

//     // find or create cart
//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       cart = new Cart({ user: userId, items: [] });
//     }
//     const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

//     if (itemIndex > -1) {
      
//       cart.items[itemIndex].quantity += quantity;
//       cart.items[itemIndex].modified = true;
//     } else {
  
//       cart.items.push({
//         product: productId,
//         quantity,
//         priceSnapshot: product.price
//       });
//     }

//     cart.updatedAt = Date.now();
//     await cart.save();

//     res.status(200).json({ success: true, data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const cart = await Cart.findOne({ user: userId })
//       .populate("items.product", "name price stock isActive");

//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     let updates = [];

//     cart.items.forEach(item => {
//       if (!item.product) {
//         updates.push(`A product in your cart was removed by admin`);
//         item.modified = true;
//         return;
//       }

//       // check price change
//       if (item.priceSnapshot !== item.product.price) {
//         updates.push(`${item.product.name} price changed from $${item.priceSnapshot} → $${item.product.price}`);
//         item.modified = true;
//       }

//       // check stock
//       if (item.product.stock < item.quantity) {
//         updates.push(`${item.product.name} stock reduced. Available: ${item.product.stock}`);
//         item.modified = true;
//       }
//     });

//     await cart.save();

//     res.status(200).json({ 
//       success: true, 
//       data: cart, 
//       updates 
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateItemQuantity = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
//     if (itemIndex === -1) return res.status(404).json({ success: false, message: "Item not in cart" });

//     cart.items[itemIndex].quantity = quantity;
//     cart.items[itemIndex].modified = true;

//     cart.updatedAt = Date.now();
//     await cart.save();

//     res.status(200).json({ success: true, data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// exports.removeItem = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     cart.items = cart.items.filter(item => item.product.toString() !== productId);

//     cart.updatedAt = Date.now();
//     await cart.save();

//     res.status(200).json({ success: true, data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// exports.clearCart = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     cart.items = [];
//     cart.updatedAt = Date.now();

//     await cart.save();

//     res.status(200).json({ success: true, message: "Cart cleared", data: cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


const {Cart, CartItem} = require("../models/cart.model"); // import both


// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // you get this from auth middleware (JWT)
    const { productId, quantity, price } = req.body;

    // 1. Find or create the cart for this user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
      await cart.save();
    }

    // 2. Check if item already exists in cart
    let cartItem = await CartItem.findOne({ cart: cart._id, product: productId });

    if (cartItem) {
      // update quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      // create new cart item
      cartItem = new CartItem({
        cart: cart._id,
        product: productId,
        quantity: quantity || 1,
        priceSnapshot: price
      });
      await cartItem.save();
    }

    return res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // fetch items separately
    const items = await CartItem.find({ cart: cart._id }).populate("product");

    return res.status(200).json({ cart, items });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    await CartItem.deleteOne({ cart: cart._id, product: productId });

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
