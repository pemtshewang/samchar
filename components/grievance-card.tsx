"use client";
import { TypographyH4, TypographyLead, TypographyP } from "./typography/typography"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"
import StatusIndicator from "./status";
import CategoryUI from "./category";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export function PaddedIcon({ Icon }) {
  return (
    <div className="h-full">
      <div className="border-2 border-secondary-foreground rounded-full p-2 mr-5">
        {Icon}
      </div>
    </div>
  )
}
async function getTotalUpvotes(id) {
  const res = await fetch(`https://samchar.vercel.app/api/total-upvotes?id=${id}`, {
    method: "GET",
    cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export default function GrievanceCard({ id, header, title, posted, grievance, type, status, category }) {
  const [upvotes, setUpvotes] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTotalUpvotes(id).then((data) => {
      setUpvotes(data);
      setLoading(false)
    });
  }, [id]);
  return (
    <div className={cn("card w-full flex border  rounded-md border-secondary-foreground p-5")}>
      {
        type === "recent" ?
          <PaddedIcon Icon={<Icons.history />} /> :
          <PaddedIcon Icon={<Icons.up />} />
      }
      <div className="flex-col w-full">
        <TypographyH4 className="tracking-wide">{header}</TypographyH4>
        <div className="flex pt-5">
          <TypographyH4 className="text-md">{title}</TypographyH4>
          <TypographyLead className="ml-auto text-sm"><i>posted on</i> {new Date(posted.toString()).toLocaleDateString()}</TypographyLead>
        </div>
        <div className="my-3">
          <TypographyP>{grievance}</TypographyP>
        </div>
        <div className="flex mt-5 items-center gap-1">
          <Icons.up />
          {
            loading ? (
              <div className="flex justify-center items-center">
                <RefreshCw className="animate-spin h-2 w-2" />
              </div>
            ) : (
              <TypographyP>{upvotes}</TypographyP>
            )
          }
          <CategoryUI category={category} />
          <StatusIndicator status={status} />
        </div>
      </div>
    </div >
  )
}

