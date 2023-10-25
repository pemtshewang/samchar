import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const grievanceSchema = z.object({
  "id": z.string(),
  "title": z.string(),
  "description": z.string(),
  "datePosted": z.string(),
  "category": z.string(),
  "adminChecked": z.boolean(),
})

export type Task = z.infer<typeof grievanceSchema>
