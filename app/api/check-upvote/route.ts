// To check if the grievance is upvoted by the user

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  const upvoted = await db.vote.findFirst({
    where: {
      grievanceId: id,
      user: user,
      userEmail: user.email,
    },
  });
  if (upvoted) {
    return NextResponse.json({ upvoted: true });
  }
  return NextResponse.json({ upvoted: false });
}

// toggle upvote from the vote table delete if exists and add if not
export async function POST(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const user = await getCurrentUser();
  const upvoted = await db.vote.findFirst({
    where: {
      grievanceId: id,
      user: user,
      userEmail: user?.email,
    },
  });
  if (upvoted) {
    await db.vote.delete({
      where: {
        id: upvoted.id,
      },
    });
    return NextResponse.json({ upvoted: false });
  }
  await db.vote.create({
    data: {
      userEmail: user?.email,
      grievanceId: id,
    },
  });
  return NextResponse.json({ upvoted: true });
  //done
}
