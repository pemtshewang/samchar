"use client"
import TopCommentSection from "./ui/top-comments-section"
import RecentGrievanceSection from "./ui/recent-grievance"
import GrievanceAnalyticsSection from "./grievances-analytics"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex-col justify-center">
      <TopCommentSection />
      <GrievanceAnalyticsSection type="all" />
      <div className="ml-auto p-5">
        To see all grievances posted by users, go to
        <Link href="/dashboard/grievances/all-grievances" className="underline italic">See all grievances</Link>
      </div>
      <RecentGrievanceSection />
    </div >
  )
}
