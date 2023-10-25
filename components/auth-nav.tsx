"use client"
import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NavItem } from "@/types"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

interface AuthNavProps {
  items?: NavItem[]
}

export function AuthNav({ items }: AuthNavProps) {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="flex gap-10 md:gap-10 ">
      {items?.length ? (
        <nav className="gap-3  md:flex items-center">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                buttonVariants({ variant: "link" }),
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}

