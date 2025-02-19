import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(){
    const users= db.prepare("SELECT * FROM DONOR").all();
    return NextResponse.json(users);
}

export async function POST(req: Request){
    try{
        const {name ,phoneNumber ,address ,email}= await req.json();
        const stmt= db.prepare("INSERT INTO DONOR (name, phoneNumber, address, email) VALUES (?,?,?,?)");
        stmt.run(name, phoneNumber, address, email);
        return NextResponse.json({message: "User added successfully"},{status:201});
    }
    catch(error){
        return NextResponse.json({message: "Failed  to add user"},{status: 500});
    }
}