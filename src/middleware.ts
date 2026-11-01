import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Ensure compatibility if loaded via Node.js or Edge runtime
if (typeof globalThis.self === "undefined") {
  (globalThis as any).self = globalThis;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sdc_default_secret_key_change_in_production_2026"
);

const COOKIE_NAME = "sdc_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
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
      const { payload } = await jwtVerify(token, JWT_SECRET);
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
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Handle login page access
  if (isLoginPage) {
    // If user explicitly logged out, ensure cookie is purged and never auto-redirect to /admin
    if (request.nextUrl.searchParams.get("logged_out") === "1") {
      const response = NextResponse.next();
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

