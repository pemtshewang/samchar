import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"

export default function DetailDialog({ description }) {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({
        variant: "default"
      }) + " text-xs"}>
        See Details
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
