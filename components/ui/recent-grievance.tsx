"use client";
import { useState, useEffect } from "react";
import GrievanceCard from "../grievance-card"
import { RefreshCw } from "lucide-react";

async function getRecentGrievance(): Promise<{
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  datePosted: string;
}> {
  const res = await fetch(`https://samchar.vercel.app/api/recent-grievance`, {
    method: "GET",
    cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
export default function RecentGrievanceSection() {
  const [grievance, setGrievance] = useState<{
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    datePosted: string;
  }>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRecentGrievance().then((data) => {
      setGrievance(data);
      setLoading(false);
    });
  }, []);
  return (
    <section className="top__recent p-5 w-full">
      {
        loading ? (
          <div className="flex flex-col justify-center items-center p-5">
            <RefreshCw className="animate-spin h-5 w-5" />
            <p className="text-center text-muted-foreground">Loading Recent Grievance</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            {
              grievance ? (
                <GrievanceCard
                  header="Recent Grievance"
                  type="recent"
                  title={grievance.title}
                  posted={new Date(grievance.datePosted).toLocaleDateString()}
                  grievance={grievance.description}
                  status={grievance.status}
                  key={grievance.id}
                  category={grievance.category}
                  id={grievance.id}
                />
              ) : (
                <p className="text-center text-muted-foreground">No recent grievance found</p>
              )
            }
          </div>
        )
      }
    </section>
  )
}
