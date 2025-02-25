"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpSMS = void 0;
const twilio_1 = __importDefault(require("twilio"));
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendOtpSMS = async (phone, otp) => {
    await twilioClient.messages.create({
        body: `Your OTP code is :${otp}`, from: process.env.TWILIO_PHONE_NUMBER, to: phone
    });
};
exports.sendOtpSMS = sendOtpSMS;
