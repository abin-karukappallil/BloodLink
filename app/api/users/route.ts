// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { NextResponse } from "next/server";

export async function GET(req: Request, ctx: any) {
    try {
        const db = ctx.env.DB;
        const stmt = db.prepare("SELECT * FROM donors;");
        const { results } = await stmt.all();

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request, ctx: any) {
    try {
        const { name, phoneNumber, address, email } = await req.json();
        const db = ctx.env.DB; 

        await db.prepare(
            "INSERT INTO donors (name, phoneNumber, address, email) VALUES (?, ?, ?, ?);"
        ).bind(name, phoneNumber, address, email).run();

        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
}
