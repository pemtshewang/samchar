import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (user) {
    const result = await db.announcement.findMany({
      orderBy: {
        datePosted: "desc"
      },
      take: 10
    });
    return NextResponse.json(result);
  }
  return NextResponse.json({ message: "User not logged in" }, { status: 401 });
}

