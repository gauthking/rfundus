import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = await fetch(`http://localhost:5000/api/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Logout failed');
        return NextResponse.json(data, { status: response.status });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
