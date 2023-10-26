import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { format } from "date-fns";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  // group the monthly grievances by format YYYY-MM-DD
  const monthlyGrievances = await db.grievance.groupBy({
    by: ['datePosted'],
    _count: {
      _all: true,
    },
    orderBy: {
      datePosted: "asc",
    },
  });
  let groups = new Map();
  for (let i = 0; i < monthlyGrievances.length; i++) {
    // lets group the monthly grievances by year-month-day
    let date = format(new Date(monthlyGrievances[i].datePosted), "yyyy-MM-dd");
    if (groups.has(date)) {
      let count = groups.get(date);
      groups.set(date, count + 1);
    } else {
      groups.set(date, 1);
    }
  }


  const grievancesByCategory = await db.grievance.groupBy({
    by: ["category"],
    _count: {
      _all: true,
    },
    orderBy: {
      category: "asc",
    },
  });
  const grievancesByStatus = await db.grievance.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
    orderBy: {
      status: "asc",
    },
  });
  return NextResponse.json({
    monthlyGrievances: Array.from(groups),
    grievancesByCategory: grievancesByCategory,
    grievancesByStatus: grievancesByStatus,
  });
}
