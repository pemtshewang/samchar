import { db } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
