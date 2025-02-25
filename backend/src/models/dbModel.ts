import mongoose from "mongoose";
import { IUser, IOTP } from "../types/interfaces";

const otpSchema = new mongoose.Schema<IOTP>({
    type: { type: String, required: true },
    value: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: process.env.OTP_EXPIRY + 'm' }
});

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    role: { type: String, default: "customer" }
})

export const OTP = mongoose.model("OTP", otpSchema);
export const User = mongoose.model("User", userSchema)

