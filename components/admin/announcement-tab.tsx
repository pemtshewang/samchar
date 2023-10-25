"use client"

import { useEffect, useState } from "react";
import { TypographyH4 } from "../typography/typography";
import { RefreshCw } from "lucide-react";
import { AddAnnouncementForm } from "./add-announcemnents-form";
import AnnouncementCard from "../announcement-card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { TabsContent } from "../ui/tabs";

async function getAnnouncements() {
  const res = await fetch('https://samchar.vercel.app/api/admin/announcements', {
    cache: "no-store"
  })
  const data = await res.json()
  return data;
}
// refresh announcements icon
function RefreshAnnouncementsIcon({ className }) {
  return (
    <RefreshCw className={className} />
  )
}
export function NotificationTab() {
  const [announcements, setAnnouncements] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAnnouncements().then((announcements) => {
      setAnnouncements(announcements);
    })
  }, []);
  return (
    <TabsContent value="notifications" className="space-y-4">
      <section className="grid grid-cols-2">
        <div className="space-y-5 p-5">
          <TypographyH4 className="mb-2">Add Announcement</TypographyH4>
          <AddAnnouncementForm />
        </div>
        <div className="space-y-5 p-5">
          <TypographyH4 className="mb-2">Recent Announcements Made</TypographyH4>
          <div className="flex">
            <p className="text-muted-foreground"><i>Click the refresh icon to refresh</i></p>
            <Button className="ml-auto" onClick={() => {
              setRefresh(true);
              getAnnouncements().then((announcements) => {
                setAnnouncements(announcements);
                // set the refresh icon to false after 2 second
                setTimeout(() => {
                  setRefresh(false);
                }, 2000);
              })
            }}>
              {
                refresh ? <RefreshAnnouncementsIcon className="animate-spin h-5 w-5 " /> : <RefreshAnnouncementsIcon className="h-5 w-5 " />
              }
            </Button>
          </div>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            {
              announcements.length > 0 ? announcements.map((announcement) => {
                return (
                  <AnnouncementCard
                    key={announcement.id}
                    title={announcement.title}
                    content={announcement.content}
                    date={new Date(announcement.datePosted).toLocaleDateString()}
                  />
                )
              }) : <p className="text-muted-foreground text-center"><i>No announcements found</i></p>
            }
          </ScrollArea>
        </div>
      </section>
    </TabsContent>
  )
}
