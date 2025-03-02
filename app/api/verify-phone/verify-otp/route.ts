import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID!;

const client = twilio(accountSid, authToken);

export async function POST(req: Request){
    try{
        const bodyText = await req.text();
        console.log("📥 Raw request body:", bodyText);
    
        const body = JSON.parse(bodyText); 
    
        const { otp, phoneNumber } = body;
    if(otp.length != 6 ){
        return NextResponse.json(
            {status:"500", error:"Invalid otp"}
        )
    }
    const twillioResponse = await client.verify.v2
    .services(serviceId)
    .verificationChecks.create({
      to: `+91${phoneNumber}`,
      code: otp,
    });
console.log(twillioResponse);
  if (twillioResponse.status === "approved") {
    return NextResponse.json({ verified: true }, { status: 200 });
  } else {
    return NextResponse.json({ verified: false }, { status: 500 });
  }
} catch (error) {
  console.log(error);

  return NextResponse.json(
    { message: "Wrong otp" },
    { status: 500 }
  );
}
}