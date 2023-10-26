"use client"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import GrievancesListPage from "@/components/admin/admin-table/npage";
import { useState, useEffect } from "react";

async function getGrievances() {
  const res = await fetch('https://samchar.vercel.app/api/admin/all-grievances/grievances-by-status', {
    cache: 'no-store'
  });
  const data = await res.json();
  const grievancesPending = data.grievances.filter((grievance) => grievance.status === 'Pending');
  const grievancesResolved = data.grievances.filter((grievance) => grievance.status === 'Resolved');
  const grievancesRejected = data.grievances.filter((grievance) => grievance.status === 'Rejected');
  const grievancesFiltered = data.grievances.filter((grievance) => grievance.status === 'Filtered');
  return {
    grievancesPending,
    grievancesResolved,
    grievancesRejected,
    grievancesFiltered,
  };
}

export default function AdminGrievancePage() {
  const [grievances, setGrievances] = useState({
    grievancesPending: [],
    grievancesResolved: [],
    grievancesRejected: [],
    grievancesFiltered: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGrievances().then((data) => {
      setGrievances(data);
      setLoading(false);
    });
  }, []);
  const {
    grievancesPending,
    grievancesResolved,
    grievancesRejected,
    grievancesFiltered,
  } = grievances;
  return (
    <Tabs defaultValue="pending" className="space-y-4">
      <TabsList>
        <TabsTrigger value="pending">
          Pending
        </TabsTrigger>
        <TabsTrigger value="resolved" >
          Resolved
        </TabsTrigger>
        <TabsTrigger value="rejected">
          Rejected
        </TabsTrigger>
        <TabsTrigger value="filtered">
          Filtered
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending" className="space-y-4">
        <div>
          <GrievancesListPage type="pending" grievances={grievancesPending} />
        </div>
      </TabsContent>
      <TabsContent value="resolved" className="space-y-4">
        <div>
          <GrievancesListPage type="resolved" grievances={grievancesResolved} />
        </div>
      </TabsContent>
      <TabsContent value="rejected" className="space-y-4">
        <div>
          <GrievancesListPage type="rejected" grievances={grievancesRejected} />
        </div>
      </TabsContent>
      <TabsContent value="filtered" className="space-y-4">
        <div>
          <GrievancesListPage type="filtered" grievances={grievancesFiltered} />
        </div>
      </TabsContent>
    </Tabs>
  )
}
