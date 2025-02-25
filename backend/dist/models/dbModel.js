"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.OTP = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: process.env.OTP_EXPIRY + 'm' }
});
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    role: { type: String, default: "customer" }
});
exports.OTP = mongoose_1.default.model("OTP", otpSchema);
exports.User = mongoose_1.default.model("User", userSchema);
