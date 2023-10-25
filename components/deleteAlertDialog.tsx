"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { buttonVariants } from "./ui/button"
import { Button } from "./ui/button"
import { Icons } from "./icons"

export default function DeleteAlertDialog({ id }) {
  async function onSubmitHandler(event) {
    event.preventDefault();
    const res = await fetch(`https://samchar.vercel.app/api/grievance/`, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    });
    console.log(res.status)
    window.location.reload();
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({
        variant: "default"
      })} >
        <Icons.delete />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete the post with for sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={onSubmitHandler}>
            <AlertDialogAction type="submit">Delete</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
