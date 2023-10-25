// getting the total number of all grievances that has been posted into the database
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const totalGrievancesCount = await db.grievance.count();
  const totalGrievancesPendingCount = await db.grievance.count({
    where: {
      status: "Pending",
    },
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
