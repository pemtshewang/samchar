import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const user = await getCurrentUser();
  const grievances = await db.grievance.findMany({
    where: {
      email: user.email,
      user: user
    }
  });
  const grievanceCountByCategoryAndStatus = {};
  for (const grievance of grievances) {
    const category = grievance.category;
    const status = grievance.status;

    if (!grievanceCountByCategoryAndStatus[category]) {
      grievanceCountByCategoryAndStatus[category] = {};
    }

    if (!grievanceCountByCategoryAndStatus[category][status]) {
      grievanceCountByCategoryAndStatus[category][status] = 0;
    }

    grievanceCountByCategoryAndStatus[category][status]++;
  }
  return NextResponse.json(grievanceCountByCategoryAndStatus);
}
