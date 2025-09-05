const mongoose = require("mongoose");

const websiteSettingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  facebook: { type: String },
  instagram: { type: String },
});

module.exports = mongoose.model("BrandSocial", websiteSettingSchema);
