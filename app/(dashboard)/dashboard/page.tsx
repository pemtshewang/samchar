import { Metadata } from "next"
import HomePage from "@/components/Home"
export const metadata: Metadata = {
  title: 'Grievances',
  description: 'Grievances Page for user',
}

export default async function GrievancesPage() {
  return (
    <HomePage />
  )
}
