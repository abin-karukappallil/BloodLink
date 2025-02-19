import { NextResponse } from "next/server";
import type { D1Database } from "@cloudflare/workers-types";

declare global {
    var DB: D1Database | undefined; 
}

export async function GET() {
    try {
        if (!DB) throw new Error("Database connection is missing.");

        const stmt = DB.prepare("SELECT * FROM donors;");
        const { results } = await stmt.all();

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, phoneNumber, address, email } = await req.json();
        if (!DB) throw new Error("Database connection is missing.");

        await DB.prepare(
            "INSERT INTO donors (name, phoneNumber, address, email) VALUES (?, ?, ?, ?);"
        ).bind(name, phoneNumber, address, email).run();

        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
}
