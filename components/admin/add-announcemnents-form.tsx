"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast"
import { useState } from "react"
import { Icons } from "../icons"
import { notificationSchema } from "@/lib/validations/notification"

export function AddAnnouncementForm() {
  const [isLoading, setIsLoading] = useState(false);
  type FormData = z.infer<typeof notificationSchema>;
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const announcement = {
      title: data.title,
      message: data.message,
    }
    const res = await fetch('https://samchar.vercel.app/api/admin/announcements', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    })
    if (res.status == 200) {
      setIsLoading(false);
      // hold the toast for 3 seconds
      toast({
        title: "Announcement posted",
        description: "Your announcement has been posted successfully to the users.",
        variant: "default",
        className: "bg-green-500",
      })
      // window.location.reload();
    }
    else {
      setIsLoading(false);
      return toast({
        title: "Something went wrong.",
        description: "Your announcement could not be posted. Please try again.",
        variant: "destructive",
      })
    }
  }
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-2 space-y-5 p-5">
        <div>
          <input type="text" id="title"  {...register("title")} placeholder="Enter your Announcement Title" className="placeholder-gray-600 w-full focus:outline-none text-xl pl-2 bg-transparent font-bold" maxLength={50} />
          {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>
        <div>
          <Textarea id="message" {...register("message")} rows={10} placeholder="Write your announcement here... " />
          {errors.message && <span className="text-red-500 text-sm">Description is required</span>}
        </div>
        <div>
          <span className="italic text-muted-foreground block mb-2 text-sm">Before submitting, please modify any changes if the post seems to need any modification</span>
          {isLoading ? (
            <Button type="submit" disabled>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Posting Announcement
            </Button>
          ) : (
            <Button type="submit">Make announcement</Button>
          )}
        </div>
      </div>
    </form >
  )
}
