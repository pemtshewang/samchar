import React from 'react';
import AuthPageHeader from '@/components/auth-header';
import DashboardNav from '@/components/dashboard-nav';
import { cn } from '@/lib/utils';
import { SiteFooter } from '@/components/site-footer';
import { UserNav } from '@/components/user-profile-nav';

export default async function Layout({ children }) {
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
