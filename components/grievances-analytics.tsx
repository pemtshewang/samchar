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

export default function GrievianceAnalyticsSection({ chartData }:
  {
    chartData: ChartDisplayAttributeType[]
  }) {
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
