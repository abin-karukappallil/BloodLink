import {db} from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { identifier, password } = body;
        if (!identifier || !password) {
            return NextResponse.json({ error: 'Missing identifier or password' }, { status: 400 });
        }
        let rows;
        if (/^\d{10}$/.test(identifier)) {
            rows = await db('SELECT * FROM DONORS WHERE phonenumber = $1', [identifier]);
        } else {
            rows = await db('SELECT * FROM DONORS WHERE LOWER(email) = LOWER($1)', [identifier]);
        }
        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
        }
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
        }
        if (!SECRET_KEY) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
        const token = jwt.sign({ userId: user.id },SECRET_KEY,{ expiresIn: '1h' });
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                donor: user.bloodgroup !== 'NULL' ? 'yes' : undefined,
            }
        },{status: 200});
        response.headers.set("Authorization", `Bearer ${token}`);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
