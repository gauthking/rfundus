"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const dbModel_1 = require("../models/dbModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const register = async (req, res) => {
    const { email, password, otp, role } = req.body;
    try {
        const userExists = await dbModel_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const otpRecord = await dbModel_1.OTP.findOne({ email, otp });
        if (!otpRecord)
            return res.status(400).json({ message: "Invalid OTP or OTP has been expired. Please try again" });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await dbModel_1.User.create({ email, password: hashedPassword, role });
        console.log("user registered successfully");
        const token = (0, generateToken_1.generateToken)(user.id);
        console.log("Generated Token:", token);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "User successfully registered", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registering user", error });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, phoneno } = req.body;
    try {
        const user = await dbModel_1.User.findOne({ email });
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
