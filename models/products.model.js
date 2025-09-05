const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    route:{
        type: String,
        unique: true,
        required: true,
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true },
    isActive: { 
        type: Boolean,
        default: true },
    isDeleted: { 
        type: Boolean, 
        default: false }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Product", productSchema);