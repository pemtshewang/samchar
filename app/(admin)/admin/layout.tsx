import AuthPageHeader from "@/components/auth-header"
import { SiteFooter } from "@/components/site-footer"
export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      <AuthPageHeader />
      <div className="p-10">
        {children}
      </div>
      <SiteFooter />
    </div>)
}
