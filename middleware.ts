import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  // Redirect logged-in users away from auth pages
  if (token && (pathname === "/login" || pathname === "/signup")) {
    const role = token.role as string;
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (role === "owner") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect authenticated routes (except favorites which allows guests)
  if (pathname.startsWith("/my-bookings") || pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Admin-only routes
    if (pathname.startsWith("/dashboard/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Dashboard is for owners/admins only
    if (
      !pathname.startsWith("/dashboard/admin") &&
      token.role !== "owner" &&
      token.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/favorites", "/my-bookings", "/profile", "/login", "/signup"],
};
