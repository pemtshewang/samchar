import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (user) {
    const result = await db.notification.findMany({
      where: {
        userEmail: user.email
      },
      orderBy: {
        timestamp: "desc"
      }
    });
    return NextResponse.json(result);
  }
  return NextResponse.json({ message: "User not logged in" }, { status: 401 });
}
