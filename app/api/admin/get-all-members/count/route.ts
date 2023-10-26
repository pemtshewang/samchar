// get the total number of users that are not admin

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const count = await db.user.count({
    where: {
      role: "User",
    },
  });
  return NextResponse.json(count);
}
