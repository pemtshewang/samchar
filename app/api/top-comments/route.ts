import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const grievance = await db.grievance.findMany({
    orderBy: {
      Vote: {
        _count: "desc"
      }
    },
  });
  if (grievance.length === 0) {
    return NextResponse.json(null);
  }
  return NextResponse.json(grievance[0])
}
