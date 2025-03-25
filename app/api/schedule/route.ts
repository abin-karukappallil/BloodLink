import { NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {alertId,userId,date} = body;
        const row = await db(`SELECT hospitalId FROM ALERTS WHERE id=$1`,[alertId]);
        const hospitalId=row[0].hospitalId;
        await db(`INSERT INTO SCHEDULED(alerId,userId,date,hospitalId) VALUES($1,$2,$3,$4)`,[alertId,userId,date,hospitalId]);
        NextResponse.json(
            {status:200,message:"Succesfully Scheduled"}
        )
    }catch(e){
        console.log(e);
        NextResponse.json(
            { status: 500, error: "internal server error" }
        )
    }
} 