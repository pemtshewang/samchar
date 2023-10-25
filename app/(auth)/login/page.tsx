import Link from "next/link";
import LoginImage from "@/public/login.png";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import {
  TypographyH1,
  TypographyH4,
} from "@/components/typography/typography";
import { BrandLogo } from "@/components/brand";
import { LoginUserAuthForm as UserAuthForm } from "@/components/user-auth-form";

export const metadata = {
  title: "Login into an account",
  description: "Login into an existing account",
};

export default function LoginPage() {
  return (
    <div className={cn("grid grid-cols-2 ")}>
      <div className={cn("flex  pt-10 space-x-2")}>
        <div>
          <TypographyH1>Hey! Welcome back.</TypographyH1>
          <Image
            className={cn("rounded-xl ")}
            src={LoginImage}
            alt="Image of Register People"
          />
        </div>
        <div className="h-full w-px bg-gradient-to-b from-yellow-400 to-orange-400"></div>
      </div>
      <div className={cn("ml-3")}>
        <div className={cn("flex gap-1")}>
          <div className="flex items-center">
            <TypographyH4 className="tracking-wider">Login into </TypographyH4>
          </div>
          <BrandLogo />
        </div>
        <div className="lg:w-3/4 mx-auto">
          <UserAuthForm page={"Login"} />
          <div className="flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300"></div>
            <div className="mx-2 text-gray-500">or</div>
            <div className="w-full h-px bg-gradient-to-l from-gray-300 via-gray-500 to-gray-300"></div>
          </div>
          <div className="flex justify-center p-4" >
            <Link href="/register" className="underline">
              Don&apos;t have an account? Register here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
