import { ChartAttributeType, ChartDisplayAttributeType } from "@/types";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function getCategoricalGrievances({ type, status }: {
  type: string,
  status: string,
}) {
  let result = [];
  if (type === 'all') {
    const grievanceCount = new Map();
    // lets initialize the map
    grievanceCount.set("Academics", 0);
    grievanceCount.set("Mess", 0);
    grievanceCount.set("Sports", 0);
    grievanceCount.set("Misc", 0);
    const grievances = await db.grievance.findMany({
      select: {
        category: true,
        status: true
      }
    });
    if (status == "all") {
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
    }
    result = Array.from(grievanceCount.entries());
  } else {
    const user = await getCurrentUser();
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
    }
    result = Array.from(grievanceCount.entries());
  }
  return result;
}

function normalizeData(data): ChartAttributeType[] {
  let normalizedData: ChartAttributeType[] = [];
  for (let i = 0; i < data.length; i++) {
    normalizedData.push({
      name: data[i][0],
      value: data[i][1],
      fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });
  }
  return normalizedData;
}

export async function getAllChartData({ type }: {
  type: string
}): Promise<ChartDisplayAttributeType[]> {
  let chartData: ChartDisplayAttributeType[] = [];
  let rejectedData = await getCategoricalGrievances({ type, status: 'rejected' });
  rejectedData = normalizeData(rejectedData);
  let resolvedData = await getCategoricalGrievances({ type, status: 'resolved' });
  resolvedData = normalizeData(resolvedData);
  let pendingData = await getCategoricalGrievances({ type, status: 'pending' });
  pendingData = normalizeData(pendingData);
  chartData.push({
    header: "Total Grievances Pending",
    data: pendingData,
    description: "Total Grievances Pending till date",
  });
  chartData.push({
    header: "Total Grievances Rejected",
    data: rejectedData,
    description: "Total Grievances Rejected till date",
  });
  chartData.push({
    header: "Total Grievances Resolved",
    data: resolvedData,
    description: "Total Grievances Resolved till date",
  });
  return chartData;
}
