import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const user = await getCurrentUser();
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
  const grievance = grievances.length > 0 ? grievances[0] : null;
  return NextResponse.json(grievance);
}
