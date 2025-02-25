"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const dbModel_1 = require("../models/dbModel");
const generateToken_1 = require("../utils/generateToken");
const register = async (req, res) => {
    const { type, value, role } = req.body;
    try {
        const userExists = type === "email"
            ? await dbModel_1.User.findOne({ email: value })
            : await dbModel_1.User.findOne({ phone: value });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = type === "email"
            ? await dbModel_1.User.create({ email: value, role })
            : await dbModel_1.User.create({ phone: value, role });
        console.log("User registered successfully");
        const token = (0, generateToken_1.generateToken)(newUser.id);
        console.log("Generated Token:", token);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "User successfully registered", newUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registering user", error });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { type, value } = req.body;
    try {
        const user = type === "email" ? await dbModel_1.User.findOne({ email: value }) : await dbModel_1.User.findOne({ phone: value });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        // const isMatch = await bcrypt.compare(password, user.phone);
        // if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
        const token = (0, generateToken_1.generateToken)(user.id);
        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Login successful", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};
exports.logout = logout;
