"use client"
import { dashboardNavItemConfig } from "@/config/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="flex space-x-4">
      {
        dashboardNavItemConfig.map((item, index) => {
          return (
            <Link href={item.href} key={index} className={cn(
              pathname === item.href
                ? "font-bold text-primary border-b-2 border-primary "
                : "font-medium text-muted-foreground")
            }>
              {item.title}
            </Link>
          )
        })
      }
    </nav >
  )
}

