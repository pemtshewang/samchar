import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const totalGrievancesCount = db.grievance.count();
  const totalGrievancesPendingCount = db.grievance.count({
    where: {
      status: "Pending",
    },
  });
  const totalGrievancesResolvedCount = db.grievance.count({
    where: {
      status: "Resolved",
    },
  });
  const totalGrievancesRejectedCount = db.grievance.count({
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
