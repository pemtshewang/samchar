"use client"
import { NotificationContentType } from "@/types";
import { useEffect, useState } from "react";
import NotificationCard from "./notification-card";
import type { Notification } from "@prisma/client";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

async function getNotifications(): Promise<Notification[]> {
  const res = await fetch("https://samchar.vercel.app/api/notifications", {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const notifications = await res.json();
  return notifications;
}
export default function NotificationContainer(): React.ReactElement<NotificationContentType> {
  const [notifications, setNotifications] = useState<Notification[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getNotifications().then((res) => {
      setNotifications(res);
      setIsLoading(false);
    })
  }, [setNotifications]);
  return (
    <div className="space-y-3">
      <Button className="flex space-x-2 mb-3 ml-auto" onClick={
        () => {
          setIsLoading(true);
          getNotifications().then((res) => {
            setNotifications(res);
            setIsLoading(false);
          })
        }
      }>
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
            <p className="text-center text-muted-foreground">Checking for notifications</p>
          </div>
        ) : (
          <></>
        )
      }
      {
        notifications?.length > 0 ? (
          notifications.map((notification) => {
            return (
              <NotificationCard key={notification.id} title={notification.title} date={new Date(notification.timestamp).toLocaleDateString()} content={notification.message} />
            )
          }
          )) : (
          isLoading ? (
            <></>
          ) : (
            <div className="flex-col justify-center p-10">
              <p className="text-center text-muted-foreground">No notifications found</p>
            </div>
          )
        )
      }
    </div >
  )
}
