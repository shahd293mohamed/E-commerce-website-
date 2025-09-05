const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signToken =(user) => {
       return jwt.sign({id: user._id, role: user.role, name: user.name},
        process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
    }

exports.signup = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;
        const user = await User.create({ name, email, password, address, role });
        const token = signToken(user);
        res.status(201).json({ message: "user created", user, token });
    } catch (error) {
        res.status(500).json({ message: "error in creating user", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(404).json({ message: "invalid email or password" });
        }
        const token = signToken(user);
        res.status(200).json({ message: "user logged in", token: signToken(user)});
    } catch (error) {
        res.status(500).json({ message: "error in logging in user", error: error.message });
    }
};