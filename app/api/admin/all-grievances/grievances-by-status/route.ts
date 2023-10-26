import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
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
