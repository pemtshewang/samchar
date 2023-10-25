import * as z from "zod";

export const userAuthSchema = z.object({
  //set the pattern for the email address that should end with .cst@rub.edu.bt
  email: z.string().email({ message: "Invalid email address" }).regex(/^[0-9A-Za-z]+\.cst@rub\.edu\.bt$/, { message: "Your email should be a college email address" }),
})


export const grievanceSchema = z.object({
  title: z.string().min(10, { message: "Title should be atleast 10 characters long" }),
  description: z.string().min(20, { message: "Description should be atleast 20 characters long" }),
  // category is a select field
  category: z.string().min(1, { message: "Please select a category" }),
  //make userId optional
  userEmail: z.string().optional(),
});
  //set the pattern for the email address that should end with .
