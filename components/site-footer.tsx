import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="dark:bg-transparent bg-gray-300">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24  md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <a
            href={"https://cst.edu.bt/"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 border rounded-full p-2"

          >
            <Icons.faceBook />
          </a>
          <a
            href={"https://github.com/pemtshewang"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 border rounded-full p-2"
          >
            <Icons.linkedIn />
          </a>
          <a
            href={"https://github.com/pemtshewang"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 border rounded-full p-2"
          >
            <Icons.gitHub />
          </a>
        </div>
        <div className="flex gap-5">
          <Link className="/"
            href="#">
            grievances.cst.edu.bt
          </Link>
          <div className={cn("border-r w-100")}>
          </div>
          <div>
            &copy;2023
          </div>
        </div>
      </div>
    </footer >
  )
}
