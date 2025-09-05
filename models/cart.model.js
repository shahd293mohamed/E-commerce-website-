// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   user: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     default: null 
// },
//   items: [{
//     product: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "Product", 
//         required: true 
//     },
//     quantity: { type: Number, default: 1 },
//     priceSnapshot: { type: Number, required: true },
//     modified: { type: Boolean, default: false },  
//   }],
//   updatedAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model("Cart", cartSchema);

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Cart", 
    required: true 
  },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  quantity: { type: Number, default: 1 },
  priceSnapshot: { type: Number, required: true },
  modified: { type: Boolean, default: false }
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = { Cart, CartItem };

