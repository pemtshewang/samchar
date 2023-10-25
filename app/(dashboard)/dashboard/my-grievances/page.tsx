// server only
import { Metadata } from "next"
import GrievianceAnalyticsSection from "@/components/grievances-analytics"
import UserGrievance from "@/components/UserGrievance"
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getAllChartData } from "@/components/graphs/config";
import ButtonLink from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: 'My Grievances',
  description: 'Grievances Page for user',
}

export default async function MyGrievancesPage() {
  const chartData = await getAllChartData({ type: "user" });
  return (
    <div>
      <GrievianceAnalyticsSection chartData={chartData} />
      <div className="p-3">
        <Card className=" flex flex-col justify-center p-5 bg-gray-200">
          <CardTitle>Your Recently Posted Grievance</CardTitle>
          <CardContent className="flex flex-col  h-full gap-y-5">
            <UserGrievance />
          </CardContent>
        </Card>
      </div>
      <div className="button__container p-5 flex gap-x-5 flex-1">
        {/* {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent} */}
        <Card className="w-[500px] flex flex-col justify-center p-5">
          <CardTitle className="mx-auto">Manage Grievances</CardTitle>
          <CardContent className="flex flex-col  h-full gap-y-5 p-5">
            <Link href="/dashboard/my-grievances/add-grievance"
              className={cn(buttonVariants({
                variant: "default"
              }))}>Add Grievance</Link>
            <Link className={cn(buttonVariants({ variant: "default" }))}
              href="/dashboard/my-grievances/all-grievances">Remove Grievance</Link>
            <Link className={cn(buttonVariants({ variant: "default" }))}
              href="/dashboard/my-grievances/all-grievances">View all Your Grievances</Link>
          </CardContent>
        </Card>
        <Card className="w-[500px] flex flex-col justify-center p-5">
          <CardTitle className="mx-auto">Saved  Grievance</CardTitle>
          <CardContent className="flex flex-col  h-full gap-y-5 p-5">
            <Link className={cn(buttonVariants({ variant: "default" }))}
              href="/dashboard/my-grievances/all-grievances">Saved Grievance</Link>
          </CardContent>
        </Card>
        <Card className="w-[500px] flex flex-col justify-center p-5">
          <CardTitle className="mx-auto">Report</CardTitle>
          <CardContent className="flex flex-col  h-full gap-y-5 p-5">
            <ButtonLink />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
