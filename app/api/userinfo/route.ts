import {db} from "@/lib/db"
import { NextResponse} from "next/server"

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    try{
    const row = await db('SELECT name from donors where id = $1',[userId])
    if(row.length>0){
        const user = row[0];
        return NextResponse.json({name: user.name})
    }else{
        return NextResponse.json({error: "User not found"},{status: 400})
    }
    
    }catch(error){
        console.log(error);
        return NextResponse.json({error: "Inetrnal server error"},{status: 500})
    }
}