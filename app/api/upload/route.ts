import { NextResponse } from "next/server";
import {db} from "@/lib/db";
export async function POST(req: Request) {
    try{
        const userId = req.headers.get("authorization")?.replace("Bearer ", "");
        if (!userId) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("image") as File;
        
        if(!file){
            return NextResponse.json({message:"No file uploaded"}, {status:400});
        }
        
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer]);
        const form = new FormData();
        form.append("file", blob);
        form.append("upload_preset", "haemoServe");
        const res = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY}/image/upload`;
        const response = await fetch(res, {
            method: "POST",
            body: form,
        });
        if(!response.ok){
            return NextResponse.json({message:"Upload failed"}, {status:500});
        }
        const data = await response.json();
        const imgUrr = data.secure_url;
        try{
            await db ("update donors set avatar = $1 where id=$2",[imgUrr,userId]);

        }catch(e){
            console.log(e);
            return NextResponse.json({message:"Internal server error"}, {status:500});
        }
        return NextResponse.json({message:"Upload successful", data});
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"Internal server error"}, {status:500});
    }

}