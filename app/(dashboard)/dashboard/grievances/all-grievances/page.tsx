"use client"
import GrievanceDetailCard from "@/components/grievance-display"
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

async function getGrievances(): Promise<any> {
  const res = await fetch("https://samchar.vercel.app/api/grievance", {
    method: 'GET',
    cache: 'no-store', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const grievances = await res.json();
  return grievances;
}
export default function AllMyGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getGrievances().then((res) => {
      setGrievances(res);
      setIsLoading(false);
    })
  }, [setGrievances]);
  return (
    <section className="p-5 space-y-5">
      {
        isLoading ? (
          <div className="flex-col justify-center p-10">
            <RefreshCw className="animate-spin w-10 h-10 mx-auto" />
            <p className="text-center text-muted-foreground">Checking for grievances</p>
          </div>
        ) : (
          <></>
        )
      }
      {grievances.length > 0 ? (
        grievances.map((grievance) => {
          return (
            <GrievanceDetailCard key={grievance.id} id={grievance.id} title={grievance.title} posted={new Date(grievance.datePosted).toLocaleDateString()} grievance={grievance.description} status={grievance.status} category={grievance.category} />
          )
        }
        )) : (
        isLoading ? (
          <></>
        ) : (
          <div className="flex-col justify-center p-10">
            <p className="text-center text-muted-foreground">No grievances found</p>
          </div>
        )
      )
      }
    </section>
  )
}

