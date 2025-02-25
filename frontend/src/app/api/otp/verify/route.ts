import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(`http://localhost:5000/api/otp/verify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to verify OTP');
        }

        console.log("verification success - ", data);
        return NextResponse.json(data, { status: response.status })
    } catch (error: any) {
        console.log("An error occured while calling the sendOtp service - ", error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}