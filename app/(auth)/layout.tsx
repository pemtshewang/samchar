import React from "react";
import AuthPageHeader from "@/components/auth-header";
import { SiteFooter } from "@/components/site-footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthPageHeader />
      {children}
      <div className="mt-5">
        <SiteFooter />
      </div>
    </div>
  );
}
