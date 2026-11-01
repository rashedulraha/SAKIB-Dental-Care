import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully!",
  });

  // Explicitly delete cookie across all standard cookie clearance headers
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Backup raw Set-Cookie header for absolute certainty across all HTTP engines
  response.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=Lax`
  );

  return response;
}

export async function GET() {
  return POST();
}
