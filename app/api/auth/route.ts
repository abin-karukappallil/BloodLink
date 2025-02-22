import {db} from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


const SECRET_KEY = process.env.SECRET_KEY;
export async function POST(req: Request) {
    
    try{
        let body;
        try {
            body = await req.json();
        } catch (error) {
            void error;
            return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
        }

        const { email, password } = body;

        const rows = await db('SELECT * FROM DONORS WHERE EMAIL = $1', [email]);
        if(rows.length == 0){
            return NextResponse.json({error: 'Invalid email or password'},{status: 400});
        }
        const user = rows[0];
        const isUser = await bcrypt.compare(password, user.password);
        if(!isUser){
            return NextResponse.json({error: 'Incorrect password'},{status: 400});
        }
        if (!SECRET_KEY) {
            return NextResponse.json({error: 'Internal server error'},{status: 500});
        }
        const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '1h'});
        return NextResponse.json({token, user: {id: user.id,email:user.email}}, {status: 200});
    }catch(e){
        console.error('Error:', e);
        return NextResponse.json({error: 'Internal server error'},{status: 500});
    }
}