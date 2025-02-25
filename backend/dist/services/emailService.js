"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendOtpEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code for VAT Refund System',
            text: `Your OTP code is: ${otp}. This code will expire in ${process.env.OTP_EXPIRY} minutes.`
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error(`An error occured while sending the OTP MAIL - ${error}`);
    }
};
exports.sendOtpEmail = sendOtpEmail;
