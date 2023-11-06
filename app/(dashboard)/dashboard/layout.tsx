import React from 'react';
import AuthPageHeader from '@/components/auth-header';
import DashboardNav from '@/components/dashboard-nav';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { UserNav } from '@/components/user-profile-nav';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function Layout({ children }) {
  // modified
  const user = await getCurrentUser();
  const role = await db.user.findUnique({
    where: {
      email: user.email
    },
    select: {
      role: true
    }
  })
  if (role.role === "Admin") {
    redirect("/admin/dashboard");
  }
  // modified ends
  return (
    <div className="min-h-screen">
      <AuthPageHeader />
      <div className='flex justify-between pt-5'>
        <DashboardNav />
        <UserNav />
      </div>
      <div className={cn("w-full border-2 border-primary-foreground min-h-screen p-5")}>
        {children}
      </div>
      <SiteFooter />
    </div >
  )
}
