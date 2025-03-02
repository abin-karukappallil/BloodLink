import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { render } from "@react-email/render";
import redis from "@/lib/redis";
import OtpEmail from "@/email/verification";
import React from "react";
import { isEmail } from "validator";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber || !isEmail(phoneNumber)) {
      console.error("Invalid or missing email address:", phoneNumber);
      return NextResponse.json(
        { message: "Invalid or missing email address" },
        { status: 400 }
      );
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);

    const expiresIn = 5 * 60; 
    try {
      await redis.set(`otp:${phoneNumber}`, otp, "EX", expiresIn);
      console.log("OTP stored in Redis successfully");
    } catch (redisError) {
      console.error("Redis error:", redisError);
      return NextResponse.json(
        { message: "Error storing OTP in Redis" },
        { status: 500 }
      );
    }
    let emailHtml;
    try {
      emailHtml = await render(React.createElement(OtpEmail, { otp }));
      console.log("Email HTML rendered successfully");
    } catch (renderError) {
      console.error("Error rendering email template:", renderError);
      return NextResponse.json(
        { message: "Error rendering email template" },
        { status: 500 }
      );
    }
    try {
      await transporter.sendMail({
        from: `Blood-Donor-System <${process.env.MAILGUN_USER}>`,
        to: phoneNumber,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
        html: emailHtml,
      });
      console.log("Email sent successfully to:", phoneNumber);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("General error in OTP generation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}