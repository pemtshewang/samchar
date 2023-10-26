import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  OverviewTab,
  ReportTab,
} from "@/components/admin/admin-tabs";
import { NotificationTab } from "@/components/admin/announcement-tab";

export default function DashboardPage() {
  return (
    <>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports" >
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
          </TabsTrigger>
        </TabsList>
        <OverviewTab />
        <ReportTab />
        <NotificationTab />
      </Tabs>
    </>
  )
}
