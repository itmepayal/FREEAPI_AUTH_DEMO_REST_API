import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];

  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

  const isHomePage = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  if (!token) {
    if (!isAuthPage && !isHomePage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!isHomePage && !isDashboard) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/dashboard/:path*",
  ],
};
