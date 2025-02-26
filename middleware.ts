import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.SECRET_KEY || " ";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; 
    if (!token) {
        console.log("No token found, redirecting to login...");
        return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        const secretKey = new TextEncoder().encode(SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey);
        console.log("Decoded Token:", payload); 
        return NextResponse.next(); 
    } catch (error) {
        console.log("Invalid token, redirecting to login...");
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ['/'],
};