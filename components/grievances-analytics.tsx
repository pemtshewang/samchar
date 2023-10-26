"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomPieChart from "./graphs/chart";
import { ChartDisplayAttributeType } from "@/types";
import { useEffect, useState } from "react";


async function getAllChartData({ type }: { type: "all" | "user" }) {
  const [result, setResult] = useState([]);
  if (type === "all") {
    const res = await fetch(`https://samchar.vercel.app/api/chart`, {
      method: "GET",
      cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResult(data);
  } else {
    const res = await fetch(`https://samchar.vercel.app/api/chart`, {
      method: "GET",
      cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResult(data);
  }
  return result;
}

export default function GrievianceAnalyticsSection({ type }: { type: "all" | "user" }) {
  const [chartData, setChartData] = useState<ChartDisplayAttributeType[]>([]);
  useEffect(() => {
    getAllChartData({ type }).then((data) => {
      setChartData(data);
    });
  }, []);
  return (// components/ScrollArea.js
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
