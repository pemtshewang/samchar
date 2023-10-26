import { db } from "@/lib/db";

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const grievances = await db.grievance.findMany();
  const grievanceCountByCategoryAndStatus = {
    Pending: {
      Academics: 0,
      Mess: 0,
      Sports: 0,
      Misc: 0
    },
    Resolved: {
      Academics: 0,
      Mess: 0,
      Sports: 0,
      Misc: 0
    },
    Rejected: {
      Academics: 0,
      Mess: 0,
      Sports: 0,
      Misc: 0
    }
  };
  for (const grievance of grievances) {
    const category = grievance.category;
    const status = grievance.status;

    if (!grievanceCountByCategoryAndStatus[status]) {
      grievanceCountByCategoryAndStatus[status] = {};
    }

    if (!grievanceCountByCategoryAndStatus[status][category]) {
      grievanceCountByCategoryAndStatus[status][category] = 0;
    }

    grievanceCountByCategoryAndStatus[status][category]++;
  }
  return NextResponse.json(grievanceCountByCategoryAndStatus);
}
