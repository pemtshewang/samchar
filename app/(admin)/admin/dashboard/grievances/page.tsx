import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import GrievancesListPage from "@/components/admin/admin-table/npage";
import { db } from "@/lib/db";

export default async function AdminGrievancePage() {

  const totalGrievancesPending = await db.grievance.findMany({
    where: {
      status: "Pending",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });

  const totalGrievancesResolved = await db.grievance.findMany({
    where: {
      status: "Resolved",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const totalGrievancesRejected = await db.grievance.findMany({
    where: {
      status: "Rejected",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const totalGrievancesFiltered = await db.grievance.findMany({
    where: {
      status: "Filtered",
    },
    select: {
      adminChecked: true,
      category: true,
      title: true,
      description: true,
      id: true,
      status: true,
      datePosted: true,
    }
  });
  const grievances = {
    grievancesPending: totalGrievancesPending,
    grievancesResolved: totalGrievancesResolved,
    grievancesRejected: totalGrievancesRejected,
    grievancesFiltered: totalGrievancesFiltered,
  };
  const { grievancesPending, grievancesResolved, grievancesRejected, grievancesFiltered } = grievances;
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
