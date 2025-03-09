import {db} from "@/lib/db";
import { NextResponse  } from "next/server";

interface bodyType{
    name:string
    phonenumber:string
    email:string
    city:string
    bloodgroup:string
    id:string
}

export async function GET(req:Request) {
    try{
        const {searchParams} = new URL(req.url);
        const idGet = (searchParams.get("id"));
        const id=Number(idGet);
        const row = await db("SELECT name,bloodgroup,phonenumber,email,city FROM DONORS WHERE id=$1",[id]);
        return NextResponse.json({status:200,row})
    }catch(e){
        console.log(e);
        return NextResponse.json({status:500})
    }
}

export async function POST(req:Request){
    try{
        const body:bodyType = await req.json();
        const {name,phonenumber,city,email,bloodgroup,id} = body;
        await db('UPDATE DONORS SET name=$1, phonenumber=$2, city=$3, email=$4, bloodgroup=$5 WHERE id=$6',[name,phonenumber,city,email,bloodgroup,id])
        return NextResponse.json({status:200})
    }catch(er){
        console.log(er);
        return NextResponse.json({status:500,error:"Internal error"})
    }
}