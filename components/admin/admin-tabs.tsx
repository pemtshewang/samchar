"use client"
import {
  TabsContent,
} from "../ui/tabs"
import { Icons } from "../icons"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from "../ui/card"
import { Members } from "./members"
import AdminChart from "./overview"
import Export from "@/components/(download)/PDFChart";
import { useEffect, useState } from "react"
// Report tab starts =================================>
export function ReportTab() {
  return (
    <TabsContent value="reports" className="space-y-4">
      <Export />
    </TabsContent>
  )
}
// Report tab ends ====================================>

async function countGrievances() {
  const response = await fetch("https://samchar.vercel.app/api/all-grievances/count");
  const data = await response.json();
  return data;
}
// Overview tab starts ====================================>
export function OverviewTab() {
  const [grievancesCount, setGrievancesCount] = useState({
    totalGrievances: 0,
    totalGrievancesPending: 0,
    totalGrievancesResolved: 0,
    totalGrievancesRejected: 0,
  });
  const [count, setCount] = useState(3);
  useEffect(() => {
    countGrievances().then((data) => {
      setGrievancesCount(data);
    });
  }, []);
  const { totalGrievances, totalGrievancesPending, totalGrievancesResolved, totalGrievancesRejected } = grievancesCount;
  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Grievances Posted
            </CardTitle>
            <Icons.penline className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGrievances}</div>
            <p className="text-xs text-muted-foreground">
              {totalGrievances} grievances posted till date
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Grievances Resolved
            </CardTitle>
            <Icons.clipBoardDone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGrievancesResolved}</div>
            <p className="text-xs text-muted-foreground">
              {totalGrievancesResolved} grievances resolved till date
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grievances Pending</CardTitle>
            <Icons.spinner2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGrievancesPending}</div>
            <p className="text-xs text-muted-foreground">
              {totalGrievancesPending} grievances pending till date
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium"> Total Grievances Rejected </CardTitle>
            <Icons.xOctagon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGrievancesRejected}</div>
            <p className="text-xs text-muted-foreground">
              {totalGrievancesRejected} grievances rejected till date
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Members joined</CardTitle>
            <CardDescription>
              {count} {count > 1 ? " members " : " member "} joined till date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Members />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}
// Overviewtab =====================================================================>
