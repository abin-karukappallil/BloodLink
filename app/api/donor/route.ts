
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(req: Request) {
    try{
        const {bloodGroup, userId} = await req.json();
        await db`UPDATE donors SET bloodGroup = ${bloodGroup} WHERE id = ${userId}`;
        return NextResponse.json({status: 200});
    }catch(err){
        console.error('Error:', err);
        return NextResponse.json({error: 'Internal server error'},{status: 500});
    }

}