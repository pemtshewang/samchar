"use client"
import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react";
import AnnouncementCard from "@/components/announcement-card";
import { Button } from "@/components/ui/button";
async function getAnnouncements() {
  const res = await fetch("https://samchar.vercel.app/api/announcements", {
    method: 'GET',
    cache: 'no-store', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const announcements = await res.json();
  return announcements;
}
export default function AnnouncementsContainer() {
  function handleRefresh() {
    setIsLoading(true);
    getAnnouncements().then((res) => {
      setAnnouncements(res);
      setIsLoading(false);
    })
  }
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAnnouncements().then((res) => {
      setAnnouncements(res);
      setIsLoading(false);
    })
  },
    [setAnnouncements]);
  return (
    <section className="space-y-5">
      <Button className="flex space-x-3 ml-auto" onClick={handleRefresh}>
        <span>Refresh</span>
        {
          isLoading ? (
            <RefreshCw className="animate-spin w-5 h-5" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )
        }
      </Button>
      {
        isLoading ? (
          <div className="flex-col justify-center p-10">
            <RefreshCw className="animate-spin w-10 h-10 mx-auto" />
            <p className="text-center text-muted-foreground">Checking for announcements</p>
          </div>
        ) : (
          <></>
        )
      }
      {announcements.length > 0 ? (
        announcements.map((announcement) => {
          return (
            <AnnouncementCard key={announcement.id} title={announcement.title} date={new Date(announcement.datePosted).toLocaleDateString()} content={announcement.content} />
          )
        }
        )) : (
        isLoading ? (
          <></>
        ) : (
          <div className="flex-col justify-center p-10">
            <p className="text-center text-muted-foreground">No announcements found</p>
          </div>
        )
      )
      }

    </section>
  )
}
