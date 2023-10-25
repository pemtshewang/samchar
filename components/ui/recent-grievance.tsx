import GrievanceCard from "../grievance-card"
import { db } from "@/lib/db";
export default async function RecentGrievanceSection() {
  const grievances = await db.grievance.findMany({
    where: {
      adminChecked: true,
    },
    orderBy: {
      datePosted: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      status: true,
      datePosted: true,
    },
  });
  const grievance = grievances.length > 0 ? grievances[0] : null;
  return (
    <section className="top__recent p-5 w-full">
      {
        grievance ? (
          <GrievanceCard
            header="Recently Posted Grievance"
            type="recent"
            title={grievance.title}
            posted={new Date(grievance.datePosted).toLocaleDateString()}
            grievance={grievance.description}
            status={grievance.status}
            category={grievance.category}
            id={grievance.id}
            key={grievance.id}
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">No Grievances Posted Yet</h1>
            <p className="text-lg text-gray-500">Check back later</p>
          </div>
        )
      }
    </section>
  )
}
