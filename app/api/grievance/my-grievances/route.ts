import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  // check if user is logged in
  const grievances = await db.grievance.findMany({
    where: {
      email: user?.email,
    },
    orderBy: {
      datePosted: "desc",
    },
  });
  // check if grievances are found
  if (!grievances) {
    return NextResponse.json(({ message: "No grievances found" }), { status: 404 });
  }
  return NextResponse.json(grievances);
}
