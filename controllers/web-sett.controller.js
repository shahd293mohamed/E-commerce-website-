const BrandSocial = require("../models/website-sett.model");

exports.getBrandSocial = async (req, res) => {
    try {
        const brandSocial = await BrandSocial.find();
        res.status(200).json(brandSocial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addBrandSocial = async (req, res) => {
    try {
        const { email, phone, facebook, instagram } = req.body;
        const brandSocial = await BrandSocial.create({ email, phone, facebook, instagram });
        res.status(201).json(brandSocial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBrandSocial = async (req, res) => {
    try {
        const brandSocial = await BrandSocial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(brandSocial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};