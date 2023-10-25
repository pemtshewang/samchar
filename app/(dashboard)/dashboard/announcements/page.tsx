import { Metadata } from "next"
import AnnouncementsContainer from "./container"

export const metadata: Metadata = {
  title: "Announcements",
  description: "Announcements",
}

export default async function AnnouncementPage() {
  return (
    <div className="container p-10 space-y-5">
      <AnnouncementsContainer />
    </div>
  )
}
