import { UserGrievance } from "@/types";
import GrievanceDetailCard from "./grievance-display";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

export default async function UserGrievance() {
  const user = await getCurrentUser();
  const grievances = await db.grievance.findMany({
    where: {
      email: user?.email,
    },
    orderBy: {
      datePosted: "desc",
    },
  });
  const grievance = grievances.length > 0 ? grievances[0] : null;
  return (
    <section className="top__comments p-5 w-full space-y-3 dark:bg-transparent" >
      {
        grievance ? (
          <GrievanceDetailCard
            id={grievance.id}
            title={grievance.title}
            status={grievance.status}
            grievance={grievance.description}
            posted={new Date(grievance.datePosted).toLocaleDateString()}
            category={grievance.category}
          />)
          : (
            <div className="text-center p-5 italic">
              No grievances has been posted yet, Please post a grievance to see it here.
            </div>
          )
      }
    </section>
  )
}

