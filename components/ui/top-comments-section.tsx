import GrievanceCard from "../grievance-card"
import { Icons } from "../icons";
import { TypographyH4 } from "../typography/typography";
import { db } from "@/lib/db";

export function PaddedIcon({ Icon }) {
  return (
    <div className="h-full">
      <div className="border-2 border-secondary-foreground rounded-full p-2 mr-5">
        {Icon}
      </div>
    </div>
  )
}

export default async function TopCommentSection() {
  const grievance = await db.grievance.findMany({
    orderBy: {
      Vote: {
        _count: "desc"
      }
    },
  });
  const topGrievance = grievance.length > 0 ? grievance[0] : null;
  return (
    <section className="top__comments p-5 w-full">
      {
        topGrievance ? (
          <GrievanceCard
            header="Top upvoted grievance"
            id={topGrievance.id}
            type="top"
            title={topGrievance.title}
            posted={new Date(topGrievance.datePosted).toLocaleDateString()}
            grievance={topGrievance.description}
            status={topGrievance.status}
            category={topGrievance.category}
          />
        ) : (
          <section className="card w-full flex-col border  rounded-md border-secondary-foreground p-5  h-[30vh]">
            <div className="flex">
              <PaddedIcon Icon={<Icons.up />} />
              <TypographyH4 className="tracking-wide">Top Upvoted Grievance</TypographyH4>
            </div>
            <div className="h-full">
              <p className="text-center text-muted-foreground italic">No top upvoted grievance. Be the first one to do it.</p>
            </div>
          </section>
        )
      }
    </section>
  )
}
