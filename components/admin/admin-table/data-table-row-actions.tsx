"use client"
import { Icons } from "@/components/icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertBox } from "../Alert"
import { grievanceSchema } from "./data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  id: string
}

async function updateGrievanceChecked(id: string) {
  const response = await fetch(`https://samchar.vercel.app/api/admin/all-grievances/update-status?id=${id}&action=adminCheck`, {
    cache: "no-cache",
  });
  const result = await response.json();
  if (result) {
    window.location.reload();
  }
  return result;
}
async function updateGrievanceStatus(id: string, status: string) {
  const response = await fetch(`https://samchar.vercel.app/api/admin/all-grievances/update-status?id=${id}&action=${status}`, {
    cache: "no-cache",
  });
  const result = await response.json();
  if (result) {
    window.location.reload();
  }
  return result;
}


export function DataTableRowActions<TData>({
  row,
  id,
}: DataTableRowActionsProps<TData>) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex text-center h-8 w-8 p-0 data-[state=open]:bg-muted bg-transparent hover:bg-transparent hover:border-secondary-foreground"
        >
          <Icons.tools className="fill-dark dark:fill-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <AlertBox
            title="Mark as Read"
            message="Are you sure you want to mark this grievance as read?"
            description="This action marks the grievance as read and allows for public viewing."
            action={() => updateGrievanceChecked(id)}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertBox
            title="Mark as Resolved"
            message="Are you sure you want to mark this grievance as resolved?"
            description="This action marks the grievance as resolved and it cannot be undone."
            action={() => updateGrievanceStatus(id, "resolve")}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertBox
            title="Mark as Rejected"
            message="Are you sure you want to mark this grievance as rejected?"
            description="This action marks the grievance as rejected and it cannot be undone."
            action={() => updateGrievanceStatus(id, "reject")}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertBox
            title="Mark as Filtered"
            message="Are you sure you want to mark this grievance as filtered?"
            description="This action marks the grievance as filtered and it cannot be undone."
            action={() => updateGrievanceStatus(id, "filter")}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
