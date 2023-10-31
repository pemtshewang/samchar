import { withAuth } from "next-auth/middleware";
import { db } from "./lib/db";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        // return NextResponse.redirect(new URL("/dashboard", req.url))

        const user = await db.user.findUnique({
          where: {
            email: token?.email,
          },
          select: {
            role: true,
          },
        });
        if (user?.role === "Admin") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        if (user?.role === "User") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return null
      }
      return null
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
  // {
  //   callbacks: {
  //     async authorized() {
  //       // This is a work-around for handling redirect on auth pages.
  //       // We return true here so that the middleware function above
  //       // is always called.
  //       return true
  //     },
  //   },
  // },
);

export const config = {
  matcher: ["/dashboard", "/login", "/register", "/api", "/admin"],
};

