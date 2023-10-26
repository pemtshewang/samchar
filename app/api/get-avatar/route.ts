import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const avatarUrl = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      avatar: true,
    },
  });
  return NextResponse.json(avatarUrl);
}
