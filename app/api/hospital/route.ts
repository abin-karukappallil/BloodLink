import {db} from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { content, units, hospitalId,date,bloodgroup } = body;
       
        if (!content || !units) {
            return NextResponse.json({ error: 'Missing content or units' }, { status: 400 });
        }
        const hospital = await db('SELECT * FROM HOSPITALS WHERE id = $1', [hospitalId]);
        const row = hospital[0];
        console.log(row);
        await db`
            INSERT INTO ALERTS (content, units, hospitalId, date,bloodgroup)
            VALUES (${content}, ${units}, ${row.id},${date},${bloodgroup});
        `;
      return NextResponse.json({ message: "Alert added successfully" }, { status: 201 });

    }catch(e){
        console.log(e);
        return NextResponse.json({error: "Internal server error"},{status: 500})
    }
}
export async function GET() {
    try{
    const row = await db(`SELECT * FROM ALERTS`);
    return NextResponse.json({ status: 200, data: row });
    }catch(e){
        console.log(e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}