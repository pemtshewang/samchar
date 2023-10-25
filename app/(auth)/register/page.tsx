import Link from "next/link";
import RegisterImage from "@/public/registertest.png";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import Image from "next/image";
import {
  TypographyH1,
  TypographyH3,
  TypographyH4,
  TypographyLead,
} from "@/components/typography/typography";
import { BrandLogo } from "@/components/brand";
import { LoginUserAuthForm as UserAuthForm } from "@/components/user-auth-form";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className={cn("grid grid-cols-2 w-fit")}>
      <div className={cn("flex  pt-10 space-x-2")}>
        <div>
          <TypographyH1>Enhancing Campus Experience:</TypographyH1>
          <TypographyLead className="indent-3">
            Enroll in CST&apos;s Grievance System and Drive Positive Change
          </TypographyLead>
          <Image
            className={cn("rounded-xl")}
            src={RegisterImage}
            alt="Image of Register People"
          />
        </div>
        <div className="h-full w-px bg-gradient-to-b from-yellow-400 to-orange-400"></div>
      </div>
      <div className={cn("ml-3")}>
        <div className={cn("flex gap-1")}>
          <div className="flex flex-col items-center justify-center mr-2">
            <TypographyH4>Register with</TypographyH4>
          </div>
          <BrandLogo />
        </div>
        <div className="lg:w-3/4 mx-auto">
          <UserAuthForm page={"Register"} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center justify-center mt-5">
            <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300"></div>
            <div className="mx-2 text-gray-500">or</div>
            <div className="w-full h-px bg-gradient-to-l from-gray-300 via-gray-500 to-gray-300"></div>
          </div>
          <div className="flex justify-center p-4" >
            <Link href="/login" className="underline">
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
