// app/api/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

async function verifyCaptcha(captchaResponse: string) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not defined");
      return false;
    }

    if (!captchaResponse) {
      console.error("No captcha response provided");
      return false;
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: captchaResponse,
      }),
    });

    const data = await response.json();
    console.log("Captcha verification response:", data);
    
    return data.success;
  } catch (error) {
    console.error("Error verifying captcha:", error);
    return false;
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phoneNumber, address, email, password, captchaResponse } = body;

    // Verify reCAPTCHA first
    const isValidCaptcha = await verifyCaptcha(captchaResponse);
    
    if (!isValidCaptcha) {
      console.error("Captcha verification failed");
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db`
      INSERT INTO donors (name, phoneNumber, address, email, password)
      VALUES (${name}, ${phoneNumber}, ${address}, ${email}, ${hashedPassword});
    `;

    return NextResponse.json({ message: "User added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}