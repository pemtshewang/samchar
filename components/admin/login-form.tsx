"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userAuthSchema } from "@/lib/validations/auth";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>;

export function AdminLoginUserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const res = await fetch(`https://samchar.vercel.app/api/check-admin?email=${data.email}`, {
      cache: "no-store",
    });
    const { isAdmin } = await res.json();
    if (isAdmin) {
      const signInResult = await signIn("email", {
        email: data.email.toLowerCase(),
        redirect: false,
      });

      setIsLoading(false);
      if (!signInResult?.ok) {
        return toast({
          title: "Something went wrong.",
          description: `Your Sign In request failed. Please try again.`,
          variant: "destructive",
        })
      }
      const message = " We sent you a login link.Check the spam folder if you don't see it."
      return toast({
        title: "Check your email",
        description: message,
        className: "bg-green-500",
      })
    }
    setIsLoading(false);
    return toast({
      title: "Not an admin email",
      description: `Your Sign In request failed. Please enter valid admin email and try again.`,
      variant: "destructive",
    })
  }
  return (
    <Form {...form}>
      <div className="max-w-md mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    autoFocus={true}
                    placeholder="Enter your valid admin college email here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center py-5">
            {isLoading ? (
              <Button type="submit" disabled>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                {"Signing In"}
              </Button>
            ) : (
              <Button type="submit">Login</Button>
            )}
          </div>
        </form>
      </div>
    </Form >
  );
}
