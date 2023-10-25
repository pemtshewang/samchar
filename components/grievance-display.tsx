"use client"
import { TypographyH4, TypographyP } from "./typography/typography"
import { cn } from "@/lib/utils"
import { Icons } from "./icons";
import StatusIndicator from "./status";
import CategoryUI from "./category";
import DeleteAlertDialog from "./deleteAlertDialog";
import PostEditDialog from "./EditDialog";
import { useEffect } from "react";
import React from "react";
import { RefreshCcwDot } from "lucide-react";

async function getUpvotes(id: string) {
  const res = await fetch(`https://samchar.vercel.app/api/total-upvotes?id=${id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}


async function checkUpvote(id: string) {
  const res = await fetch(`https://samchar.vercel.app/api/check-upvote?id=${id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}


export default function GrievanceDetailCard({ id, title, posted, grievance, status, category, user }:
  {
    id: string;
    user?: boolean;
    title: string;
    posted: string;
    grievance: string;
    status: string;
    category: string;
  }) {
  // to make the upvote button work and change the button accordingly if the user has already upvoted
  const [upvoted, setUpvoted] = React.useState(false);
  const [upvoteCount, setUpvoteCount] = React.useState(0);
  const [setUpvoteCountLoading, setSetUpvoteCountLoading] = React.useState(true);
  // use useCallBack to prevent infinite loop
  const handleUpvote = React.useCallback(() => {
    if (upvoted) {
      fetch(`https://samchar.vercel.app/api/upvote?id=${id}`, {
        method: 'POST',
      }).then(() => {
        setUpvoted(false);
        setUpvoteCount(upvoteCount - 1);
      });
    } else {
      fetch(`https://samchar.vercel.app/api/upvote?id=${id}`, {
        method: 'POST',
      }).then(() => {
        setUpvoted(true);
        setUpvoteCount(upvoteCount + 1);
      });
    }
  }, [upvoted, id, upvoteCount]);


  useEffect(() => {
    checkUpvote(id).then((res) => {
      setUpvoted(res.upvoted);
    })
    getUpvotes(id).then((res) => {
      setUpvoteCount(res);
      setSetUpvoteCountLoading(false);
    })
  }, [handleUpvote, id]);

  return (
    <div className={cn("card w-full flex border  rounded-md border-secondary-foreground p-5")}>
      <div className="flex-col w-full">
        <div className="flex pt-5">
          <TypographyH4>{title.toString()}</TypographyH4>
          <p className="ml-auto text-muted-foreground"><i>Posted on</i> {new Date(posted.toString()).toLocaleDateString()}</p>
        </div>
        <div className="my-3">
          <TypographyP>{grievance.toString()}</TypographyP>
        </div>
        <div className="flex mt-5 items-center gap-1">
          <div className="mr-5 w-[50px] flex items-center">
            <button onClick={handleUpvote}>
              {
                upvoted ? (
                  <Icons.darkarrow className="dark:fill-white" />
                ) : (
                  <Icons.uparrowoutline className="dark:fill-white" />
                )
              }
            </button>
            {
              setUpvoteCountLoading ? (
                <RefreshCcwDot className="animate-spin w-2 h-2" />
              ) : (
                <span className="ml-1 font-bold">{upvoteCount}</span>
              )
            }
          </div>
          <CategoryUI category={category} />
          <StatusIndicator status={status} />
          {
            // if it is user, display edit and delete button
            user ? (
              <div className="ml-auto flex gap-1 space-x-2">
                {
                  status == "Pending" ? (
                    <PostEditDialog id={id} title={title} description={grievance} category={category} />
                  ) : null
                }
                <DeleteAlertDialog id={id} />
              </div>
            ) : null
          }
        </div>
      </div>
    </div >
  )
}

