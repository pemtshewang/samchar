"use client"
import React, { useState, useEffect } from "react";
import GrievanceDetailCard from "@/components/grievance-display";
import type { Grievance } from "@prisma/client";

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

  useEffect(() => {
    getGrievances().then((grievances) => {
      setGrievances(grievances);
    });
  }, []);


  return (
    <section className="p-5 space-y-5">
      {grievances.length > 0 ? (
        grievances.map((grievance, index) => {
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
            />
          );
        })
      ) : (
        <p>No grievances found</p>
      )}
    </section>
  );
}
