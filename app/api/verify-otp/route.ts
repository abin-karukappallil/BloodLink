import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { requestId, otp } = req.body;

    try {
        const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
                client_id: process.env.AUTH0_CLIENT_ID,
                username: requestId,
                otp,
                realm: "sms",
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ token: data.access_token });
        } else {
            return res.status(400).json({ error: data.error || "Invalid OTP" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
