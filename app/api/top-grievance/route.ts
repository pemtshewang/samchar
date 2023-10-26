// API route to get top grievances

// Tested

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const grievance = await db.grievance.findMany({
    orderBy: {
      Vote: {
        _count: "desc"
      }
    },
    take: 1,
  });
  if (!grievance) {
    return NextResponse.json({ message: "No grievances found" }, { status: 404 });
  }
  return NextResponse.json(grievance);
  // get the top 1 grievance
}
