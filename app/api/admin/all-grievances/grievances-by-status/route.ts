import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const grievances = await db.grievance.findMany({
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    },
  });
  return NextResponse.json(grievances);
}
