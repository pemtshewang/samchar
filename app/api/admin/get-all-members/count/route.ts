// get the total number of users that are not admin

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const count = await db.user.count({
    where: {
      role: "User",
    },
  });
  return NextResponse.json(count);
}
