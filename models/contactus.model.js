const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null },
  category: { 
    type: String, 
    enum: ["complain", "question"], 
    required: true },
  message: { 
    type: String, 
    required: true },
    subject: {
        type: String,
        required: true
    }

}, { timestamps: true });



module.exports = mongoose.model("Contactus", contactSchema);