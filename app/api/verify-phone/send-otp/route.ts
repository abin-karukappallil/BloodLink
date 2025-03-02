import twilio from "twilio";
import {NextResponse} from "next/server";

export async function POST(request: Request){
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID!;

const client = twilio(accountSid, authToken);

    try{
        const body = await request.json();
        const phoneNumber = body.phoneNumber;
        if(phoneNumber.length > 10){
            return NextResponse.json(
                {status: "500", error:"Invalid phone number"}
            )
        }
        const twillioResponse = await client.verify.v2
        .services(serviceId)
        .verifications.create({
          to: `+91${phoneNumber}`,
          channel: "sms",
        });
  console.log(twillioResponse);
      if (twillioResponse.status === "pending") {
        return NextResponse.json({ sent: true }, { status: 200 });
      } else {
        return NextResponse.json({ sent: false }, { status: 500 });
      }
    }catch(err){
        console.log(err);
        return NextResponse.json(
            {status: "500", error: "Server error"}
        )
    }
}