import { MainNav } from "@/components/admin/main-nav"
import format from "date-fns/format";
import { AdminUserNav } from "@/components/admin/user-nav";
export default function AdminDashboardLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex justify-between">
        <MainNav />
        <AdminUserNav />
      </div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="ml-auto p-3 border-2">
            {format(new Date(), "'Today is a' eeee")}&nbsp;| &nbsp;{format(new Date(), "dd-MM-yyyy")}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
