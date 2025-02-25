"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const dbModel_1 = require("../models/dbModel");
const generateOtp_1 = require("../utils/generateOtp");
const emailService_1 = require("../services/emailService");
const smsService_1 = require("../services/smsService");
const sendOtp = async (req, res) => {
    const { type, value } = req.body;
    if (!value || (type !== "email" && type !== "mobile")) {
        return res.status(400).json({ message: "Invalid type or value" });
    }
    const otp = (0, generateOtp_1.generateOtp)();
    try {
        if (type === "email") {
            await (0, emailService_1.sendOtpEmail)(value, otp);
        }
        else if (type === "mobile") {
            await (0, smsService_1.sendOtpSMS)(value, otp);
        }
        // to del3te the existing otp records
        // await OTP.deleteMany({ value });
        await dbModel_1.OTP.create({ type, value, otp });
        res.status(200).json({ message: `OTP sent to ${type} successfully` });
    }
    catch (error) {
        console.log('Error sending OTP', error);
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};
exports.sendOtp = sendOtp;
const verifyOtp = async (req, res) => {
    const { type, value, otp } = req.body;
    if (!value || !otp || (type !== "email" && type !== "mobile")) {
        return res.status(400).json({ message: "Invalid input data" });
    }
    try {
        const otpRecord = await dbModel_1.OTP.findOne({ type, value, otp }).sort({ createdAt: -1 });
        if (!otpRecord)
            return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
        return res.status(200).json({ message: 'OTP verified successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error verifying OTP', error });
    }
};
exports.verifyOtp = verifyOtp;
