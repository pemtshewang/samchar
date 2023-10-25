import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }
  // if user exists then do this
  if (user) {
    const userRole = await db.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        role: true,
      },
    });
    if (userRole?.role === "User") {
      redirect("/");
    }
  }
  return (
    <div>
    </div>
  )
}
