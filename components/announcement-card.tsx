import { TypographyH4, TypographyLead, TypographyP, TypographyH3 } from "./typography/typography"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"
import { AnnouncementContentType } from "@/types";

export function PaddedIcon() {
  return (
    <div className="rounded-full p-1 mr-5 ">
      <Icons.bell />
    </div>
  )
}
export default function AnnouncementCard({ title, date, content }: AnnouncementContentType): React.ReactElement<AnnouncementContentType> {
  return (
    <div className={cn("card w-full bg-gray-300 dark:bg-transparent flex border p-5 h-[30vh] shadow-xl")} >
      <PaddedIcon />
      <div className="flex-col w-full">
        <div className="flex">
          <TypographyH4 className="text-md tracking-wide">{title}</TypographyH4>
          <TypographyLead className="ml-auto text-sm">{date}</TypographyLead>
        </div>
        <div className="content__section" >
          <TypographyP className="w-4/5">{content}</TypographyP>
        </div>
      </div>
    </div >
  )
}

