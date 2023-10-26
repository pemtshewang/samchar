import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { makeNotification } from "@/lib/notifications";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }
  const url = new URL(req.url);
  const { id, action } = Object.fromEntries(url.searchParams);
  if (action === "adminCheck") {
    const read = await db.grievance.update({
      where: {
        id: id,
      },
      data: {
        adminChecked: true,
      },
    });
    return NextResponse.json(read);
  }
  if (action === "resolve") {
    const resolved = await db.grievance.update({
      where: {
        id: id,
      },
      data: {
        status: "Resolved",
      },
    });
    // create Notification
    (async () => {
      const notification = makeNotification({
        title: resolved.title,
        type: "resolved",
      })
      await db.notification.create({
        data: {
          title: "Grievance Resolved",
          message: notification.message,
          userEmail: resolved.email,
        }
      });
    })();

    return NextResponse.json(resolved);
  }
  if (action === "reject") {
    const rejected = await db.grievance.update({
      where: {
        id: id,
      },
      data: {
        status: "Rejected",
      },
    });
    // create Notification
    (async () => {
      const notification = makeNotification({
        title: rejected.title,
        type: "rejected",
      })
      await db.notification.create({
        data: {
          title: "Grievance Rejected",
          message: notification.message,
          userEmail: rejected.email,
        }
      });
    })();
    return NextResponse.json(rejected);
  }
  if (action === "filter") {
    const filtered = await db.grievance.update({
      where: {
        id: id,
      },
      data: {
        status: "Filtered",
      },
    });
    // create Notification
    (async () => {
      const notification = makeNotification({
        title: filtered.title,
        type: "filtered",
      })
      await db.notification.create({
        data: {
          title: "Grievance Filtered",
          message: notification.message,
          userEmail: filtered.email,
        }
      });
    })();
    return NextResponse.json(filtered);
  }
}
