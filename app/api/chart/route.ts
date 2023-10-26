import { ChartAttributeType, ChartDisplayAttributeType } from "@/types";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

async function getCategoricalGrievances({ type, status }: { type: string, status: string }) {
  const user = await getCurrentUser();
  // const grievances = await db.grievance.findMany({
  //   where: (type === 'all' ? {} : { email: user.email }),
  //   select: {
  //     category: true,
  //     status: true,
  //   },
  // });
  let grievances = [];
  if (type === 'all') {
    grievances = await db.grievance.findMany({
      select: {
        category: true,
        status: true,
      },
    });
  } else {
    grievances = await db.grievance.findMany({
      where: {
        email: user.email,
        user: user
      },
      select: {
        category: true,
        status: true,
      },
    });
  }
  const grievanceCount = {
    Academics: { all: 0, rejected: 0, resolved: 0 },
    Mess: { all: 0, rejected: 0, resolved: 0 },
    Sports: { all: 0, rejected: 0, resolved: 0 },
    Misc: { all: 0, rejected: 0, resolved: 0 },
  };

  for (const grievance of grievances) {
    if (type === 'all' || (type !== 'all' && grievance.category === type)) {
      grievanceCount[grievance.category].all++;
      if (status === 'rejected' && grievance.status === 'Rejected') {
        grievanceCount[grievance.category].rejected++;
      }
      if (status === 'resolved' && grievance.status === 'Resolved') {
        grievanceCount[grievance.category].resolved++;
      }
    }
  }

  return grievanceCount;
}

function normalizeData(data): ChartAttributeType[] {
  const normalizedData: ChartAttributeType[] = [];
  for (const category in data) {
    if (data.hasOwnProperty(category)) {
      normalizedData.push({
        name: category,
        value: data[category],
      });
    }
  }
  return normalizedData;
}

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const statuses = ['all', 'rejected', 'resolved'];
  const chartData: ChartDisplayAttributeType[] = [];

  for (const status of statuses) {
    const grievanceData = await getCategoricalGrievances({ type, status });
    const normalizedData = normalizeData(grievanceData);
    const header = `Total Grievances ${status === 'all' ? 'Pending' : status}`;
    const description = `Total Grievances ${status === 'all' ? 'Pending' : status} till date`;

    chartData.push({ header, data: normalizedData, description });
  }

  return NextResponse.json(chartData);
}
