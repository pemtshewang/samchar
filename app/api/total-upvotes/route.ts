// get total upvotes for the grievance by the grievance id from the Vote table

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const id = searchParams.get('id');

  const totalUpvotes = await db.vote.count({
    where: {
      grievanceId: id
    }
  });

  return NextResponse.json(totalUpvotes);
}
