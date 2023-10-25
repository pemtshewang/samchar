import { columns } from "./columns"
import { DataTable } from "./data-table"
import format from "date-fns/format"

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }


export default async function GrievancesListPage({ grievances, type }) {
  return (
    <>
      <div className="hidden h-full  flex-col space-y-8 p-8 md:flex">
        <DataTable data={grievances} columns={columns} type={type} />
      </div>
    </>
  )
}
