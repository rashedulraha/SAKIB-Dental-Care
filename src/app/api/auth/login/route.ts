import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminPassword, signAdminToken, COOKIE_NAME } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const password = typeof body.password === "string" ? body.password : "";

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Invalid password! Please enter the correct admin password. (ভুল পাসওয়ার্ড!)" },
        { status: 401 }
      );
    }

    const token = await signAdminToken();

    // Determine if request is secure over HTTPS
    const isHttps =
      req.headers.get("x-forwarded-proto") === "https" || req.url.startsWith("https:");

    const cookieOptions = {
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    };

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, cookieOptions);

    const response = NextResponse.json({
      success: true,
      message: "Login successful! (লগইন সফল হয়েছে)",
    });

    response.cookies.set(COOKIE_NAME, token, cookieOptions);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during login. Please try again." },
      { status: 500 }
    );
  }
}
