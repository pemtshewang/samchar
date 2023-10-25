// to get all the users that are not admin and also the total number of grievances that has been posted by the user  into the database
// total number of grievances that has been posted by the user
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const users = await db.user.findMany({
    where: {
      role: "User",
    },
    select: {
      createdAt: true,
      email: true,
      grievances: {
        select: {
          id: true,
        },
      },
    },
  });
  return NextResponse.json(users);
}

