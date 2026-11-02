import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/auth/secret";

const COOKIE_NAME = "sdc_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage =
    (pathname.startsWith("/admin") && pathname !== "/admin/login") ||
    pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");

  // Only run logic for admin pages or admin APIs
  if (!isAdminPage && !isLoginPage && !isAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, getJwtSecret());
      if (payload.role === "admin") {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // 1. If hitting admin API without valid session -> 401
  if (isAdminApi && !isAuthenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Admin session required" },
      { status: 401 }
    );
  }

  // 2. If hitting protected admin page without valid session -> Redirect to login
  if (isAdminPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 3. Handle login page access
  if (isLoginPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/admin/:path*"],
};
