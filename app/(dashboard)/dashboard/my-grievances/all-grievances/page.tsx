"use client"
import React, { useState, useEffect } from "react";
import GrievanceDetailCard from "@/components/grievance-display";
import type { Grievance } from "@prisma/client";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllMyGrievances() {
  async function getGrievances(): Promise<Grievance[]> {
    const res = await fetch("https://samchar.vercel.app/api/grievance/my-grievances", {
      method: "GET",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
    });
    const grievances = await res.json();
    return grievances;
  }

  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getGrievances().then((grievances) => {
      setGrievances(grievances);
      setLoading(false);
    });
  }, []);


  return (
    <section className="p-5 space-y-5">
      <div className="flex justify-end">
        <Button variant="default" className="w-fit"
          onClick={() => {
            setLoading(true);
            getGrievances().then((grievances) => {
              setGrievances(grievances);
              setLoading(false);
            });
          }}
        >
          Refresh &nbsp;
          {
            loading ? (
              <RefreshCw className="animate-spin" />
            ) : (
              <RefreshCw />
            )
          }
        </Button>
      </div>
      {
        loading ? (
          <div className="flex justify-center items-center">
            <RefreshCw className="animate-spin" />
          </div>
        ) : (
          grievances.length > 0 ? (
            grievances.map((grievance) => {
              return (
                <GrievanceDetailCard
                  key={grievance.id}
                  id={grievance.id}
                  title={grievance.title}
                  posted={new Date(grievance.datePosted).toLocaleDateString()}
                  grievance={grievance.description}
                  status={grievance.status}
                  category={grievance.category}
                  user={true}
                />)
            })
          ) : (
            <div className="flex justify-center items-center">
              <h1>No Grievances</h1>
            </div>
          )
        )
      }
    </section>
  );
}
