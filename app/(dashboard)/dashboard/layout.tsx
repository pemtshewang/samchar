import React from 'react';
import AuthPageHeader from '@/components/auth-header';
import DashboardNav from '@/components/dashboard-nav';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { UserNav } from '@/components/user-profile-nav';


export default async function Layout({ children }) {
  const user = await getCurrentUser();
  const userRole = await db.user.findFirst({
    where: {
      email: user.email,
    },
    select: {
      role: true,
    },
  });
  if (userRole?.role === "Admin") {
    redirect("/admin/dashboard");
  }
  return (
    <div className="min-h-screen">
      <AuthPageHeader />
      <div className='flex justify-between pt-5'>
        <DashboardNav />
        <UserNav />
      </div>
      <div className={cn("w-full border-2 border-primary-foreground min-h-screen")}>
        {children}
      </div>
      <SiteFooter />
    </div >
  )
}
