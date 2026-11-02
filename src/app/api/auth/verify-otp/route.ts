import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAdminCredentials, matchesSecret } from "@/lib/auth/credentials";
import {
  compareOtpHashes,
  hashOtp,
  OTP_MAX_ATTEMPTS,
} from "@/lib/auth/otp";
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
    !("code" in body) ||
    typeof body.email !== "string" ||
    typeof body.code !== "string" ||
    body.email.length > 254 ||
    !/^\d{6}$/.test(body.code)
  ) {
    return NextResponse.json(
      { success: false, message: "Enter the six-digit verification code." },
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

  const email = body.email.trim().toLowerCase();
  if (!matchesSecret(email, credentials.email)) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired verification code." },
      { status: 401 }
    );
  }

  try {
    const challenge = await prisma.adminOtpChallenge.findUnique({
      where: { email },
    });

    if (!challenge || challenge.expiresAt <= new Date()) {
      if (challenge) {
        await prisma.adminOtpChallenge.deleteMany({ where: { email } });
      }
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code." },
        { status: 401 }
      );
    }

    if (challenge.attempts >= OTP_MAX_ATTEMPTS) {
      return NextResponse.json(
        { success: false, message: "Too many incorrect codes. Request a new code." },
        { status: 429 }
      );
    }

    const submittedHash = hashOtp(email, body.code);
    if (!compareOtpHashes(submittedHash, challenge.codeHash)) {
      await prisma.adminOtpChallenge.updateMany({
        where: {
          email,
          codeHash: challenge.codeHash,
          attempts: { lt: OTP_MAX_ATTEMPTS },
          expiresAt: { gt: new Date() },
        },
        data: { attempts: { increment: 1 } },
      });

      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code." },
        { status: 401 }
      );
    }

    const consumed = await prisma.adminOtpChallenge.deleteMany({
      where: {
        email,
        codeHash: challenge.codeHash,
        expiresAt: { gt: new Date() },
        attempts: { lt: OTP_MAX_ATTEMPTS },
      },
    });

    if (consumed.count !== 1) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code." },
        { status: 401 }
      );
    }

    const token = await signAdminToken();
    const response = NextResponse.json({
      success: true,
      message: "Admin sign-in successful.",
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin OTP verification failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to verify the code. Please try again later." },
      { status: 500 }
    );
  }
}
