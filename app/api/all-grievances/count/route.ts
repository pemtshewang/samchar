import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
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
