const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    default: null 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

categorySchema.index({ parent: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
