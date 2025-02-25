import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');

        console.log("login success - ", data);
        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
