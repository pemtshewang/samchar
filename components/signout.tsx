"use client"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button";
export function SignOutPage() {
  return (
    <Button onClick={
      () => signOut({ callbackUrl: `${window.location.origin}/login` })
    }>
      Sign Out
    </Button >
  )
}
