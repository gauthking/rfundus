import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendOtpEmail = async (email: string, otp: string): Promise<any> => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code for VAT Refund System',
            text: `Your OTP code is: ${otp}. This code will expire in ${process.env.OTP_EXPIRY} minutes.`
        };
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(`An error occured while sending the OTP MAIL - ${error}`)
    }
}