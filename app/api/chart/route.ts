import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
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
