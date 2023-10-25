// get total upvotes for the grievance by the grievance id from the Vote table

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {

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
