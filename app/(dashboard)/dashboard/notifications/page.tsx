import { Metadata } from "next"
import NotificationContainer from "@/components/notifications-container"

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'Notifications Page for user',
}

export default function NotificationsPage() {
  return (
    <div className="flex flex-col p-10 ">
      <NotificationContainer />
    </div>
  )
}
