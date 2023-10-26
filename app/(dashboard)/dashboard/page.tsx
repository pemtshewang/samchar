import { Metadata } from "next"
import GrievancesAnalyticsSection from "@/components/grievances-analytics"
import TopCommentSection from "@/components/ui/top-comments-section"
import RecentGrievanceSection from "@/components/ui/recent-grievance"
import Link from "next/link"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: 'Grievances',
  description: 'Grievances Page for user',
}


export default async function GrievancesPage() {
  const user = await getCurrentUser();
  return (
    <div>
      <GrievancesAnalyticsSection type={"all"} />
      <TopCommentSection />
      <div className="ml-auto p-5">
        To see all grievances posted by users, go to <Link href="/dashboard/grievances/all-grievances" className="underline italic">See all grievances</Link>
      </div>
      <RecentGrievanceSection />
    </div >
  )
}
