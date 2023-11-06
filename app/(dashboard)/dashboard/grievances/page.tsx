"use client"
import { useEffect, useState } from "react";
import GrievanceDetailCard from "@/components/grievance-display"
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";


async function getGrievances(): Promise<any> {
  const res = await fetch("https://samchar.vercel.app/api/all-grievances",
    {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const grievances = await res.json();
  return grievances;
}

export default function AllGrievancesPage() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGrievances().then((grievances) => {
      setGrievances(grievances);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Grievances</h1>
        <Button
          onClick={() => {
            getGrievances().then((grievances) => {
              setLoading(true);
              setGrievances(grievances);
              setLoading(false);
            });
          }
          }
          className="flex items-center space-x-2"
        >
          <RefreshCw />
          <span>Refresh</span>
        </Button>
      </div>
      <div className="space-y-3 p-5">
        {
          loading ? (
            <div className="flex flex-col justify-center text-center p-5 italic">
              <RefreshCw className="animate-spin w-10 h-10 mx-auto" />
              <p className="text-center text-muted-foreground">Checking for all grievances</p>
            </div>
          ) : (
            grievances.length > 0 ? (
              grievances.map((grievance) => (
                <GrievanceDetailCard
                  key={grievance.id}
                  id={grievance.id}
                  title={grievance.title}
                  status={grievance.status}
                  grievance={grievance.description}
                  posted={new Date(grievance.datePosted).toLocaleDateString()}
                  category={grievance.category}
                />
              ))
            ) : (
              <div className="text-center p-5 italic">
                No grievances has been posted yet, Please post a grievance to see it here.
              </div>
            )
          )
        }
      </div>
    </>
  )
}
