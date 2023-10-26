import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  // return the grievances ordered by the latest date posted
  const grievances = await db.grievance.findMany({
    where: {
      adminChecked: true,
    },
    orderBy: {
      datePosted: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      status: true,
      datePosted: true,
    },
  });
  return NextResponse.json(grievances);
}
