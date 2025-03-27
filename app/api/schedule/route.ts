import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, userId } = body;
        console.log(id)
        console.log(userId)
        if (!id) {
            return NextResponse.json({ error: "Alert ID is required" }, { status: 400 });
        }
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }
        const name= await db(`SELECT NAME FROM DONORS WHERE id=$1`,[userId])
        const rows = await db(`SELECT hospitalid, date FROM ALERTS WHERE id=$1`, [id]);

        if (!rows.length) {
            return NextResponse.json({ error: "No alert found with the provided ID" }, { status: 404 });
        }

        const { hospitalid: hospitalId, date } = rows[0];

        if (!hospitalId) {
            return NextResponse.json({ error: "No hospital associated with this alert" }, { status: 400 });
        }

        try {
            await db(
                `INSERT INTO SCHEDULED (alertId, userId, date, hospitalId) VALUES ($1, $2, $3, $4)`,
                [id, userId, date, hospitalId]
            );

            await new Promise((resolve) => setTimeout(resolve, 500));

            await db(`UPDATE ALERTS SET scheduled=TRUE WHERE id=$1`, [id]);

            return NextResponse.json({ message: `Successfully Scheduled by ${name[0].name}` }, { status: 200 });
        } catch (insertError) {
            return NextResponse.json({ error: "Failed to schedule alert", details: insertError }, { status: 500 });
        }
    } catch (error) {
        void error;
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
