"use client"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function GrievancesListPage({ grievances, type }) {
  return (
    <>
      <div className="hidden h-full  flex-col space-y-8 p-8 md:flex">
        <DataTable data={grievances} columns={columns} type={type} />
      </div>
    </>
  )
}
