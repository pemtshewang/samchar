/*
 * This route is to get all grievances and return them as categorical  
 */
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const url = new URL(request.url); // get the status and the user email from the url
  const status = url.searchParams.get("status");
  if (!user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 })
  }

  // check if user is logged in
  // grievances of all categories ==========================================>
  const grievanceCount = new Map();
  // lets initialize the map
  grievanceCount.set("Academics", 0);
  grievanceCount.set("Mess", 0);
  grievanceCount.set("Sports", 0);
  grievanceCount.set("Misc", 0);
  const grievances = await db.grievance.findMany({
    where: {
      email: user.email,
    },
    select: {
      category: true,
      status: true
    }
  });
  if (status === "all") {
    // lets count the grievances and store them accordingly to their category
    for (let grievance of grievances) {
      if (grievance.category == "Academics") {
        grievanceCount.set("Academics", grievanceCount.get("Academics") + 1);
      }
      else if (grievance.category == "Mess") {
        grievanceCount.set("Mess", grievanceCount.get("Mess") + 1);
      }
      else if (grievance.category == "Sports") {
        grievanceCount.set("Sports", grievanceCount.get("Sports") + 1);
      }
      else if (grievance.category == "Misc") {
        grievanceCount.set("Misc", grievanceCount.get("Misc") + 1);
      }
    }
    // return the map as a json which can be mapped 
    return NextResponse.json(Array.from(grievanceCount.entries()));
  }
  // =========================================================================>
  // grievances Rejected count ==============================================>
  if (status === "rejected") {
    for (let grievance of grievances) {
      if (grievance.category == "Academics") {
        // check if the grievance is status is resolved
        if (grievance.status == "Rejected") {
          grievanceCount.set("Academics", grievanceCount.get("Academics") + 1);
        }
      }
      else if (grievance.category == "Mess") {
        if (grievance.status == "Rejected") {
          grievanceCount.set("Mess", grievanceCount.get("Mess") + 1);
        }
      }
      else if (grievance.category == "Sports") {
        if (grievance.status == "Rejected") {
          grievanceCount.set("Sports", grievanceCount.get("Sports") + 1);
        }
      }
      else if (grievance.category == "Misc") {
        if (grievance.status == "Rejected") {
          grievanceCount.set("Misc", grievanceCount.get("Misc") + 1);
        }
      }
    }
    // return the map as a json which can be mapped 
    return NextResponse.json(Array.from(grievanceCount.entries()));
  }
  // =========================================================================>
  // grievances Resolved count ==============================================>
  if (status === "resolved") {
    // lets define a map first
    const grievanceCount = new Map();
    // lets initialize the map
    grievanceCount.set("Academics", 0);
    grievanceCount.set("Mess", 0);
    grievanceCount.set("Sports", 0);
    grievanceCount.set("Misc", 0);

    // lets count the grievances and store them accordingly to their category
    for (let grievance of grievances) {
      if (grievance.category == "Academics") {
        // check if the grievance is status is resolved
        if (grievance.status == "Resolved") {
          grievanceCount.set("Academics", grievanceCount.get("Academics") + 1);
        }
      }
      else if (grievance.category == "Mess") {
        if (grievance.status == "Resolved") {
          grievanceCount.set("Mess", grievanceCount.get("Mess") + 1);
        }
      }
      else if (grievance.category == "Sports") {
        if (grievance.status == "Resolved") {
          grievanceCount.set("Sports", grievanceCount.get("Sports") + 1);
        }
      }
      else if (grievance.category == "Misc") {
        if (grievance.status == "Resolved") {
          grievanceCount.set("Misc", grievanceCount.get("Misc") + 1);
        }
      }
    }
    // return the map as a json which can be mapped 
    return NextResponse.json(Array.from(grievanceCount.entries()));
  }
  // =========================================================================>
}
