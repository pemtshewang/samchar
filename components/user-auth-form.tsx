"use client";

import * as React from "react";
import { redirect, useSearchParams } from "next/navigation";
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
import { Button } from "./ui/button";


type FormData = z.infer<typeof userAuthSchema>;

export function LoginUserAuthForm({ page }) {
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const signInResult = await signIn("email", {
      email: data.email,
      redirect: false
    });
    setIsLoading(false);
    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Your ${page === "Login" ? "Sign In" : "Verification"} request failed. Please try again.`,
        variant: "destructive",
      })
    }
    const message = page === "Login" ? `
We sent you a login link. Check the spam folder if you don't see it.
`:
      `
We sent you a verification link for login. Check the spam folder if you don't see it.
`;
    return toast({
      title: "Check your email",
      description: message,
      className: "bg-green-500",
    })
  }
  return (
    <Form {...form}>
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
                  placeholder="Enter your valid college email here"
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
              {
                page === "Login" ? "Signing in" : "Registering"
              }
            </Button>
          ) : (
            <Button type="submit">{page}</Button>
          )}
        </div>
      </form>
    </Form >
  );
}
