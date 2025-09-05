const User = require("../models/user.model");


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "All users", users});
    } catch (error) {
        res.status(500).json({message:"error in getting users",error: err.message});
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ message: "user", user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = (role) =>
    { return async (req, res) => {
    try {
        const { name, phone, email, password, addresses} = req.body;
        const user = await User.create({ name, phone, email, password, addresses, role });
        res.status(201).json({message:"user created",user});
    } catch (error) {
        res.status(500).json({ message:"error in creating user" ,error: error.message });
    }
}
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({message:"user updated",user});

    } catch (error) {
        res.status(500).json({ message:"error in updating user" ,error: err.message });
    }
}