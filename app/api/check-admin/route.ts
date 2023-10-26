// route to check if the user is admin or not  
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const url = new URL(request.url);
  const checkEmail = url.searchParams.get("email");
  const isAdmin = await db.user.findFirst({
    where: {
      email: checkEmail,
    },
  });
  const isAdminEmail = isAdmin?.role === "Admin";
  if (isAdminEmail) {
    return NextResponse.json({ isAdmin: true });
  }
  return NextResponse.json({ isAdmin: false });
}
