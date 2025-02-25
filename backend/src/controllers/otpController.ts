import { Request, RequestHandler, Response } from "express";
import { OTP } from "../models/dbModel";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpEmail } from "../services/emailService";
import { sendOtpSMS } from "../services/smsService";

export const sendOtp = async (req: Request, res: Response): Promise<any> => {
    const { type, value } = req.body;
    if (!value || (type !== "email" && type !== "mobile")) {
        return res.status(400).json({ message: "Invalid type or value" });
    }

    const otp = generateOtp();

    try {
        if (type === "email") {
            await sendOtpEmail(value, otp);
        } else if (type === "mobile") {
            await sendOtpSMS(value, otp);
        }

        // to del3te the existing otp records
        // await OTP.deleteMany({ value });

        await OTP.create({ type, value, otp });
        res.status(200).json({ message: 'OTP sent to mobile successfully' });


    } catch (error) {
        console.log('Error sending OTP', error)
        res.status(500).json({ message: 'Error sending OTP', error });
    }
}

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
    const { type, value, otp } = req.body;
    if (!value || !otp || (type !== "email" && type !== "mobile")) {
        return res.status(400).json({ message: "Invalid input data" });
    }
    try {
        const otpRecord = await OTP.findOne({ type, value, otp }).sort({ createdAt: -1 });

        if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP or OTP expired' });

        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error verifying OTP', error });
    }
};