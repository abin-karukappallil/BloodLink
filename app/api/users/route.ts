
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
    const { name, phoneNumber, city, email, password, captchaResponse } = body;
    console.log(city);
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
      INSERT INTO donors (name, phonenumber, city, email, password)
      VALUES (${name}, ${phoneNumber}, ${city}, ${email}, ${hashedPassword});
    `;

    return NextResponse.json({ message: "User added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const donors = await db`
      SELECT id,name, city, phonenumber,bloodgroup FROM donors WHERE city = ${city} AND bloodgroup != 'NULL';
    `;
    return NextResponse.json({ donors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching donors:", error);
    return NextResponse.json({ error: "Failed to fetch donors" }, { status: 500 });
  }
}