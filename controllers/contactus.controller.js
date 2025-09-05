const Contactus= require("../models/contactus.model");

exports.getAllMessages = async (req, res) => {
    try {
        const contactus = await Contactus.find().populate("user");
        res.status(200).json({ message: "All contactus", contactus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createContactus = async (req, res) => {
    try {
        const user = req.user.id;
        const { category, message ,subject} = req.body;
        const contactus = await Contactus.create({ user, category, message ,subject});
        res.status(201).json({ message: "contactus created", contactus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMessageUser = async (req, res) => {
    try {
        const contactus = await Contactus.find({ user: req.params.id });
        res.status(200).json({ message: "All contactus", contactus });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};