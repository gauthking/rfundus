import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtpSMS = async (phone: string, otp: string) => {
    await twilioClient.messages.create({
        body: `Your OTP code is :${otp}`, from: process.env.TWILIO_PHONE_NUMBER, to: phone
    })
}