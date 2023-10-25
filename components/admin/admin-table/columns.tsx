"use client"

import { ColumnDef } from "@tanstack/react-table"
import DetailDialog from "./detail-dialog"
import { Task } from "./data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "datePosted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Posted" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("datePosted")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "adminChecked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Read" />
    ),
    cell: ({ row }) => <div className="w-[10px]">{row.getValue("adminChecked") ? "True" : "False"}</div>,
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }

  },
  // grievance labelling
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grievance" />
    ),
    cell: ({ row }) => {

      // get the grievance title
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
    // filter by grievance title
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "category",
    id: "category",
    enableSorting: true,
    enableColumnFilter: true,
    enableMultiSort: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {

      // get the grievance title
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("category")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: "description",
    enableSorting: false,
    id: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="See Content" />
    ),
    cell: ({ row }) => {
      // get the grievance title
      return (
        <div className="flex space-x-2">
          <DetailDialog description={row.getValue('description')} />
        </div>
      )
    },
  },
  {
    // keep same
    accessorKey: "id",
    id: "id",
    //
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <DataTableRowActions row={row} id={row.getValue("id")} />
    ),
  },
]
