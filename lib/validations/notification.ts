import z from "zod";

export const notificationSchema = z.object({
  //set the pattern for the email address that should end with .cst@rub.edu.bt
  title: z.string().min(10, { message: "Title should be atleast 10 characters long" }),
  message: z.string().min(20, { message: "Message should be atleast 20 characters long" }),
})
  //set the pattern for the email address that should end with .
