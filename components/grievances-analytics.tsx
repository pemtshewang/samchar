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

async function getAllChartData({ type }: { type: "all" | "user" }): Promise<ChartDisplayAttributeType[]> {
  const res = await fetch(`https://samchar.vercel.app/api/chart?type=${type}`, {
    method: "GET",
    cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export default function GrievianceAnalyticsSection({ type }: { type: "all" | "user" }) {
  const [chartData, setChartData] = useState<ChartDisplayAttributeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getAllChartData({ type }).then((data) => {
      setChartData(data);
      setLoading(false);
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
