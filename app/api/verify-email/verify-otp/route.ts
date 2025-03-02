import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
    }
    console.log("Parsed Request Body:", body);
    const { phoneNumber, otp } = body;
    if (!phoneNumber || !otp) {
      console.log("Missing email or OTP in request");
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }
    try {
      const storedOtp = await redis.get(`otp:${phoneNumber}`);
      console.log(`Retrieved from Redis - stored OTP: ${storedOtp}`);
      if (!storedOtp) {
        console.log("OTP not found in Redis");
        return NextResponse.json({ message: "OTP not found or expired" }, { status: 400 });
      }
      if (storedOtp !== otp) {
        console.log(`OTP mismatch. Provided: ${otp}, Stored: ${storedOtp}`);
        return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
      }
      await redis.del(`otp:${phoneNumber}`);
      console.log("OTP verified successfully and removed from Redis");
      return NextResponse.json({ message: "Email verified successfully" });
    } catch (redisError) {
      console.error("Redis error during verification:", redisError);
      return NextResponse.json({ message: "Error accessing OTP data" }, { status: 500 });
    }
  } catch (error) {
    console.error("General error in OTP verification:", error);
    return NextResponse.json({ message: "Error verifying OTP" }, { status: 500 });
  }
}