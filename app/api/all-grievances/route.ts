import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
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
