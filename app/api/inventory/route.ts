import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const inventory = await db(`SELECT bloodgroup, COUNT(*) AS units FROM donors where bloodgroup!='NULL' GROUP BY bloodgroup`);
    console.log(inventory)
    const categorizedInventory = inventory.map((blood) => {
      let status;

      if (blood.units <= 5) {
        status = "low";
      } else if (blood.units <= 10) {
        status = "adequate";
      } else {
        status = "high";
      }

      return { ...blood, status };
    });

    return NextResponse.json(categorizedInventory);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching inventory", error }, { status: 500 });
  }
}
