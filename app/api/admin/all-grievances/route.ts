import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const totalGrievancesCount = await db.grievance.count();
  const totalGrievancesPendingCount = await db.grievance.count({
    where: {
      status: "Pending"
    }
  });
  const totalGrievancesResolvedCount = await db.grievance.count({
    where: {
      status: "Resolved",
    },
  });
  const totalGrievancesRejectedCount = await db.grievance.count({
    where: {
      status: "Rejected",
    },
  });
  const grievancesCount = {
    "totalGrievances": totalGrievancesCount,
    "totalGrievancesPending": totalGrievancesPendingCount,
    "totalGrievancesResolved": totalGrievancesResolvedCount,
    "totalGrievancesRejected": totalGrievancesRejectedCount,
  };

  return NextResponse.json(grievancesCount);
}
