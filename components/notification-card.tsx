"use client"

import { TypographyH4, TypographyLead, TypographyP } from "./typography/typography"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"
import { NotificationContentType } from "@/types";

export function PaddedIcon() {
  return (
    <div className="rounded-full p-1 mr-5 ">
      <Icons.horn />
    </div>
  )
}
export default function NotificationCard({ title, date, content }: NotificationContentType): React.ReactElement<NotificationContentType> {
  return (
    <div className={cn("card w-full bg-gray-300 dark:bg-transparent flex border pt-2 px-5 max-h-[50vh] shadow-xl flex-col")} >
      <div className="flex-col w-full content py-5">
        <div className="mb-5 flex-col">
          <div className="flex mb-5 pt-5">
            <PaddedIcon />
            <TypographyH4 className="text-md tracking-wide">{title}</TypographyH4>
            <TypographyLead className="ml-auto text-sm">{date}</TypographyLead>
          </div>
          <div className="content__section" dangerouslySetInnerHTML={{ __html: content }}>
          </div>
        </div>
      </div>
      <div className="footer mb-2 border border-t-secondary-foreground ">
        <TypographyP className="text-sm text-muted-foreground">If you have any enquiry, please let us know at <i>admin.grievance.cst@rub.edu.bt</i></TypographyP>
        <TypographyP className="text-sm text-muted-foreground">Thank you for your patience and helping CST grow.😀</TypographyP>
      </div>
    </div >
  )
}

