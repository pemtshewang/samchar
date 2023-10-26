"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // check the path and set the active class underline
  // get the base path the last part of the path
  const path = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 py-5 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/dashboard"
        className={`text-sm font-medium  transition-colors hover:text-primary ${path === "/admin/dashboard" ? "border-b-2 border-primary" : "text-muted-foreground"}`}
      > Overview </Link>
      <Link
        href="/admin/dashboard/grievances"
        className={`text-sm font-medium  transition-colors hover:text-primary ${path === "/admin/dashboard/grievances" ? "border-b-2 border-primary" : "text-muted-foreground"}`}
      >
        Grievances
      </Link>
      <Link
        href="/admin/dashboard/users"
        className={`text-sm font-medium  transition-colors hover:text-primary ${path === "/admin/dashboard/users" ? "border-b-2 border-primary" : "text-muted-foreground"}`}
      >
        Users
      </Link>
    </nav >
  )
}
