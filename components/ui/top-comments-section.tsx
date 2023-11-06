"use client";
import { useState, useEffect } from "react";
import GrievanceCard from "../grievance-card"
import { RefreshCw } from "lucide-react";

async function getTopGrievance(): Promise<{
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  datePosted: string;
}> {
  const res = await fetch(`https://samchar.vercel.app/api/top-comments/`, {
    method: "GET",
    cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export default function TopCommentSection() {
  const [grievance, setGrievance] = useState<{
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    datePosted: string;
  }>()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTopGrievance().then((data) => {
      setGrievance(data);
      setLoading(false)
    });
  }, []);
  return (
    <section className="top__comments p-5 w-full">
      {
        loading ? (
          <div className="flex justify-center items-center">
            <RefreshCw className="animate-spin h-5 w-5" />
            <p className="text-center text-muted-foreground">Loading Top Grievance</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold p-2">Top Commented Grievance</h1>
            {
              grievance ? (
                <GrievanceCard
                  header="Top Commented Grievance"
                  type="top"
                  title={grievance.title}
                  posted={new Date(grievance.datePosted).toLocaleDateString()}
                  grievance={grievance.description}
                  status={grievance.status}
                  category={grievance.category}
                  id={grievance.id}
                  key={grievance.id} />
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold p-2">Top Commented Grievance</h1>
                  <p className="text-lg font-bold p-1 text-muted-foreground">No Grievances Posted Yet</p>
                  <p className="text-lg text-gray-500 text-muted-foreground">Check back later</p>
                </div>
              )
            }
          </div>
        )
      }
    </section>
  )
}
