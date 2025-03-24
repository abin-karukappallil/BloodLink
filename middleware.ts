import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.SECRET_KEY || " ";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value; 
    const hos = req.cookies.get("hospital")?.value;
    const { pathname } = req.nextUrl;
    if (!token) {
        if (pathname !== '/login'&& pathname !== "/signup") {
            console.log("No token found, redirecting to login...");
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }
    try {
        const secretKey = new TextEncoder().encode(SECRET_KEY);
        const { payload } = await jwtVerify(token, secretKey);
        console.log("Decoded Token:", payload);
        if (hos && ["/profile", "/login", "/signup", "/"].includes(pathname)) {
            return NextResponse.redirect(new URL("/hospital", req.url));
        }
        if (token && (pathname === "/login" || pathname === "/signup")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        if(!hos && pathname === "/hospital") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        if (hos==="true" && pathname === "/") {
            return NextResponse.redirect(new URL("/hospital", req.url));
        }
        return NextResponse.next();

    } catch (error) {
        console.log("Invalid token, redirecting to login...");
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token"); 
        return response;
    }
}

export const config = {
    matcher: ['/login','/signup','/profile',"/hospital"],
};