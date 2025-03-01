import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { phone } = req.body;

    try {
        const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/passwordless/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: process.env.AUTH0_CLIENT_ID,
                connection: "sms",
                phone_number: phone,
                send: "code",
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ requestId: data._id });
        } else {
            return res.status(400).json({ error: data.error || "Failed to request OTP" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
