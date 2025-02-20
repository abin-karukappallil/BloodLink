import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import bcrypt from "bcrypt";

export async function GET() {
    try {
        const data = await db`SELECT * FROM donors;`;
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: error}, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, phoneNumber, address, email, password } = await req.json();
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
