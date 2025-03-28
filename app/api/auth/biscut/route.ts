import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY;

export async function GET() {
  try {
    if (!SECRET_KEY) {
      return NextResponse.json({ 
        status: 500, 
        error: "Secret key is not configured" 
      }, { status: 500 });
    }
    const token = jwt.sign({ user: "guest" }, SECRET_KEY, { 
      expiresIn: "15m" 
    });
    const response = NextResponse.json({ 
      status: 200, 
      message: "Token set in cookies!" 
    });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 900, 
    });

    return response;
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json({ 
      status: 500, 
      error: "Error generating token" 
    }, { status: 500 });
  }
}