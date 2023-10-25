import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  // check if user is logged in
  const announcements = await db.announcement.findMany({
    orderBy: {
      datePosted: "desc",
    },
  });
  // return announcements
  return NextResponse.json(announcements);
}
export async function POST(request: Request): Promise<NextResponse> {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const body = await request.json();
  const { title, message } = body;
  const announcement = await db.announcement.create({
    data: {
      title,
      content: message,
    }
  });
  // check if grievance is created
  if (!announcement) {
    return NextResponse.json({ message: "Announcement not posted", status: 400 });
  }
  return NextResponse.json({ message: "Announcement posted successfully" });
}
