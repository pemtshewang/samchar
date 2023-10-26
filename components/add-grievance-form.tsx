"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { grievanceCategoryConfig } from "@/config/categories"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { grievanceSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { Icons } from "./icons"

export function AddGrievanceComponent({ edit, title, id, description, category }: {
  edit?: boolean,
  title?: string,
  id?: string,
  description?: string,
  category?: string
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  type FormData = z.infer<typeof grievanceSchema>;
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(grievanceSchema),
    defaultValues: {
      title: edit ? title : "",
      category: edit ? "Academic" : "",
      description: edit ? description : "",
      userEmail: ""
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const grievance = {
      title: data.title,
      category: data.category,
      description: data.description,
    }
    if (edit) {
      const res = await fetch("/api/grievance", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...grievance }),
      })
      if (res.status == 200) {
        setIsLoading(false);
        // hold the toast for 3 seconds
        toast({
          title: "Grievance Updated",
          description: "Your grievance has been updated successfully.",
          variant: "default",
          className: "bg-green-500"
        })
        window.location.href = "/dashboard/my-grievances/all-grievances";
      }
    } else {
      const res = await fetch('/api/grievance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(grievance),
      })
      if (res.status == 200) {
        setIsLoading(false);
        // hold the toast for 3 seconds
        toast({
          title: "Grievance Submitted",
          description: "Your grievance has been submitted successfully.",
          variant: "default",
        })
        window.location.href = "/dashboard/my-grievances/all-grievances";
      }
      else {
        setIsLoading(false);
        return toast({
          title: "Grievance Submission Failed",
          description: "Your grievance could not be submitted. Please try again later.",
          variant: "destructive",
        })
      }
    }
  }
  function onValueChange(value: string) {
    setValue("category", value);
  }
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-2 space-y-5 p-5">
        <div>
          <input type="text" id="title"  {...register("title")} placeholder="Enter your Grievance Title" className="placeholder-gray-600 w-full focus:outline-none text-xl pl-2 bg-transparent font-bold" maxLength={50} defaultValue={title} />
          {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>
        <div className="category" id="category" {...register('category')}>
          <Select onValueChange={onValueChange} defaultValue={category}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Grievance Category" className="text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              {
                grievanceCategoryConfig.map((category) => {
                  return (
                    <SelectItem key={category.grievance} value={category.grievance} className="text-blue-500" >{category.grievance}</SelectItem>
                  )
                })
              }
            </SelectContent>
          </Select>
          {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
        </div>
        <div>
          <Textarea id="description" {...register("description")} rows={10} placeholder="Write your grievance here... Please check the norms of writing the grievance" defaultValue={description} />
          {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
        </div>
        <div>
          <span className="italic text-muted-foreground block mb-2 text-sm">Before submitting, please modify any changes if the post seems to need any modification</span>
          {isLoading ? (
            <Button type="submit" disabled>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              {
                edit ? "Saving Changes" : "Submitting Grievance"
              }
            </Button>
          ) : (
            <Button type="submit">{edit ? "Save Changes" : "Submit Grievance"}</Button>
          )}
        </div>
      </div>
    </form >
  )
}
