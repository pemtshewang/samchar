"use client"
import { Icons } from "./icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddGrievanceComponent } from "./add-grievance-form"
import { buttonVariants } from "@/components/ui/button"

export default function PostEditDialog({ id, title, description, category }) {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({
        variant: "default"
      })}>
        <Icons.edit />
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Your Grievance</DialogTitle>
          <DialogDescription>
            Make changes to your posted grievances here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AddGrievanceComponent edit={true} title={title} id={id} description={description} category={category} />
      </DialogContent>
    </Dialog>
  )
}
