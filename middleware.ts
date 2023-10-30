import { withAuth } from "next-auth/middleware";
import { db } from "./lib/db";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./lib/session";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        const user = await getCurrentUser();
        const role = await db.user.findUnique({
          where: {
            email: user.email,
          },
          select: {
            role: true,
          },
        })
        if (role.role === "Admin") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url))
        }
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    // callbacks: {
    //   async authorized() {
    //     // This is a work-around for handling redirect on auth pages.
    //     // We return true here so that the middleware function above
    //     // is always called.
    //     return true
    //   },
    // },
  },
);

export const config = {
  matcher: ["/dashboard", "/login", "/register", "/api"],
};

