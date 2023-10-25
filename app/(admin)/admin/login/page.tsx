import { AdminLoginUserAuthForm } from "@/components/admin/login-form";
import { TypographyH4 } from "@/components/typography/typography";

export const metadata = {
  title: "Admin",
  description: "Login into an existing account",
};

export default function LoginPage() {
  return (
    <div className="pt-5">
      <TypographyH4 className="text-center tracking-wide">Admin Login</TypographyH4>
      <section className="min-h-[70vh]">
        <AdminLoginUserAuthForm />
      </section>
    </div>
  );
}
