import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const totalGrievancesPending = await db.grievance.findMany({
    where: {
      status: "Pending",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const totalGrievancesResolved = await db.grievance.findMany({
    where: {
      status: "Resolved",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const totalGrievancesRejected = await db.grievance.findMany({
    where: {
      status: "Rejected",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const totalGrievancesFiltered = await db.grievance.findMany({
    where: {
      status: "Filtered",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const grievances = {
    "grievancesPending": totalGrievancesPending,
    "grievancesResolved": totalGrievancesResolved,
    "grievancesRejected": totalGrievancesRejected,
    "grievancesFiltered": totalGrievancesFiltered,
  };
  return NextResponse.json(grievances);
}
