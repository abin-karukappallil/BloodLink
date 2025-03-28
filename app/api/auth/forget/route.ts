import { NextResponse, NextRequest } from "next/server";
import {db} from "@/lib/db"
import bcrypt from "bcrypt";
import rateLimit  from "next-rate-limit";
import jwt from "jsonwebtoken";
const limiter = rateLimit({
  interval: 15 * 60 * 1000, 
  uniqueTokenPerInterval: 5, 
});

const SECRET_KEY = process.env.SECRET_KEY || "";

export async function POST(req:NextRequest){
    try{
        
        const body = await req.json();
        await limiter.checkNext(req, 5); 
        const cookies = req.cookies;
        const token = cookies.get('auth_token')?.value;
    
        if (!token) {
          return NextResponse.json({ 
            status: 401, 
            error: "Unauthorized. No token found." 
          }, { status: 401 });
        }
    
        try {
          if (!SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined");
          }
          jwt.verify(token, SECRET_KEY);
        } catch (err) {
            void(err)
          return NextResponse.json({ error: "Invalid or expired token." });
        }
        const {resetEmail,newPassword} = body;
        const password=newPassword;
        const email =resetEmail;
        if(!email || !password){
            return NextResponse.json({status:400,error:"Bad request"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db(`UPDATE DONORS SET password = $1 WHERE email=$2`,[hashedPassword,email])
        return NextResponse.json({status:200,message:"Password updated successfully"})
    }catch(e){
        console.log(e);
        return NextResponse.json({status:500, error:"internal server error"})
    }
}