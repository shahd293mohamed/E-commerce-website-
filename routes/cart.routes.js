// const express = require("express");
// const router = express.Router();

// const {addToCart,getCart,updateItemQuantity,removeItem,clearCart} = require("../controllers/cart.controller");

// router.post("/addToCart", addToCart);
// router.get("/getCart/:userId", getCart);
// router.put("/updateCart", updateItemQuantity);
// router.delete("/deleteCart/:userId", removeItem);
// router.delete("/clearCart/:userId", clearCart);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { addToCart, getCartByUser, removeFromCart, clearCart } = require("../controllers/cart.controller");
const {authenticate} = require("../middelwares/auth.middelware"); // JWT middleware
const {authorize} = require("../middelwares/role.middelware");


router.post("/add", authenticate,  authorize("user"),addToCart);
router.get("/", authenticate, authorize("user") ,getCartByUser);
router.delete("/remove", authenticate,authorize("user") , removeFromCart);
// router.delete("/clear", authenticate, clearCart);

module.exports = router;
