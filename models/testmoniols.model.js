const mongoose = require("mongoose");

const testmoniolsSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
    email: { 
        type: String, 
        required: true },
    message: { 
        type: String, 
        required: true },
    isApproved: { 
        type: Boolean, 
        default: false },
    isSeen:{
        type: Boolean,
        default: false
    },
    isDeleted: { 
        type: Boolean, 
        default: false }
    }, { timestamps: true });

module.exports = mongoose.model("Testmoniols", testmoniolsSchema);