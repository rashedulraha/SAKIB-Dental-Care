import { NextResponse } from "next/server";
import {
  getAdminCredentials,
  verifyAdminCredentials,
} from "@/lib/auth/credentials";
import { COOKIE_NAME, signAdminToken } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    !("password" in body) ||
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    body.email.length > 254 ||
    body.password.length > 1024
  ) {
    return NextResponse.json(
      { success: false, message: "Enter a valid email address and password." },
      { status: 400 }
    );
  }

  const credentials = getAdminCredentials();
  if (!credentials) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured.");
    return NextResponse.json(
      { success: false, message: "Admin authentication is not configured." },
      { status: 503 }
    );
  }

  if (!verifyAdminCredentials(body.email, body.password, credentials)) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password." },
      { status: 401 }
    );
  }

  try {
    const token = await signAdminToken();
    const response = NextResponse.json({
      success: true,
      message: "Admin sign-in successful.",
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin sign-in failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to sign in. Please try again later." },
      { status: 500 }
    );
  }
}
