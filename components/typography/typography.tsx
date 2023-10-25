import React from "react"
import { cn } from "@/lib/utils"

export function TypographyH1({ className, children }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={`scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl ${cn(className)}`}>
      {children}
    </h2>
  )
}

export function TypographyH2({ className, children }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={`scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${cn(className)}`}>
      {children}
    </h2>
  )
}

export function TypographyH3({ className, children }: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${cn(className)}`} >
      {children}
    </h3 >
  )
}

export function TypographyH4({ className, children }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${cn(className)}`}>
      {children}
    </h4 >
  )
}

export function TypographyP({ className, children }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`leading-7 [&: not(: first - child)]: mt - 6 ${cn(className)}`}>
      {children}
    </p >
  )
}

export function TypographyLead({ className, children }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`text-muted-foreground ${cn(className)}`}>
      {children}
    </p>
  )
}


