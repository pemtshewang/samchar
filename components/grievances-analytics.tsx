"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomPieChart from "./graphs/chart";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

async function getAllChartData({ type }: { type: "all" | "user" }) {
  let result = [];
  if (type === "all") {
    const res = await fetch(`https://samchar.vercel.app/api/chart`, {
      method: "GET",
      cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    result = data;
  } else {
    const res = await fetch(`https://samchar.vercel.app/api/chart/user`, {
      method: "GET",
      cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await res.json();
  }
  const fill = ["#0088FE", "#00C49F", "#FF6384", "#FFF121"]
  return Object.entries(result).map(([header, values]) => ({
    header: header,
    description: `Total grievances ${header.toLowerCase()} till date`,
    data: Object.entries(values).map(([name, value], index) => ({
      name: name,
      value: value,
      fill: fill[index]
    })),
  }));
}

export default function GrievianceAnalyticsSection({ type }: { type: "all" | "user" }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllChartData({ type }).then((data) => {
      setChartData(data);
      setLoading(false)
    });
  }, [type]);
  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center">
            <RefreshCw className="animate-spin h-5 w-5" />
            <p className="text-center text-muted-foreground">Generating Analytics Chart</p>
          </div>
        ) : (
          <section className="grid lg:grid-cols-3 sm:flex-col p-3 justify-items-center gap-x-2" >
            {
              chartData.map((data, index) => {
                return (
                  <Card className="p-7 w-full" key={index}>
                    <CardHeader className="p-0 m-0">
                      <CardTitle >{data.header}</CardTitle>
                      <CardDescription>{data.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3">
                      <CustomPieChart data={data.data} />
                    </CardContent>
                  </Card>
                )
              })
            }
          </section >
        )
      }
    </>
  )
}

