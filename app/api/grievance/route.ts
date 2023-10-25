//
// API Route for the user
// 
// api route for grievance posting by user
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { makeNotification } from "@/lib/notifications";

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  const body = await request.json();
  const { title, description, category } = body;
  const grievance = await db.grievance.create({
    data: {
      title,
      description,
      category,
      email: user?.email,
    },
  });

  const notification = makeNotification({ title, type: "pending" });
  const createNotification = await db.notification.create({
    data: {
      title: "New Grievance Posted Successfully",
      message: notification.message,
      userEmail: user?.email,
    }
  });
  // check if grievance is created
  if (!grievance || !createNotification) {
    return NextResponse.json({ message: "Grievance not posted" }, { status: 400 });
  }
  return NextResponse.json({ message: "Grievance posted successfully" });
}

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  // check if user is logged in
  const grievances = await db.grievance.findMany({
    where: {
      email: user?.email,
      adminChecked: true,
    },
    orderBy: {
      datePosted: "desc",
    },
  });
  // check if grievances are found
  if (!grievances) {
    return NextResponse.json({ message: "No grievances found" }, { status: 404 });
  }
  return NextResponse.json(grievances);
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (user) {
    const { id } = await request.json();
    // check if user is logged in
    const grievance = await db.grievance.delete({
      where: {
        id,
      },
    });
    // handle the error
    if (!grievance) {
      return NextResponse.json({ message: "Grievance not deleted" }, { status: 400 });
    }
    return NextResponse.json({ message: "Grievance deleted successfully" });
  } else {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (user) {
    const { id, title, description, category } = await request.json();
    // check if user is logged in
    const grievance = await db.grievance.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        category,
      },
    });
    // handle the error
    if (!grievance) {
      return NextResponse.json({ message: "Grievance not updated" }, { status: 400 });
    }
    return NextResponse.json({ message: "Grievance updated successfully" });
  } else {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
}
