import AuthPageHeader from "@/components/auth-header"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Layout({ children }: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }
  // if user exists then do this
  return (
    <div className="">
      <AuthPageHeader />
      <div className="p-10">
        {children}
      </div>
      <SiteFooter />
    </div>)
}
