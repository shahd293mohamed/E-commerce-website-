const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        priceAtTimeOfOrder: {
            type: Number,
            required: true
        }
    }],
    totalPrice: { type: Number, required: true },

    cancletionReason: {
        type: String,
        required: false
    },
    statusOfOrder: {
        type: String,
        required: true,
        enum: ["pending","preparing","ready_for_shipping","shipped","received","rejected","cancelled"],
        default: "pending"
    },
    cancelldBywho :{
    type: String,
    enum: ["user", "admin"],
    default: null
    },

},
{timestamps: true}
); 

module.exports = mongoose.model("Order", orderSchema);