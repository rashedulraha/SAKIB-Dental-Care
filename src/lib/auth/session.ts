import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getJwtSecret } from "@/lib/auth/secret";

export const COOKIE_NAME = "sdc_admin_session";

export interface SessionPayload {
  role: "admin";
  authenticatedAt: number;
}

/**
 * Creates an encrypted JWT session token for the admin
 */
export async function signAdminToken(): Promise<string> {
  return await new SignJWT({ role: "admin", authenticatedAt: Date.now() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

/**
 * Verifies an incoming session token
 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Checks if current request in Next.js Server Components / Route Handlers is authenticated
 */
export async function getIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return await verifyAdminToken(token);
}

/**
 * Validates session from NextRequest (for Edge Middleware)
 */
export async function verifyRequestSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return await verifyAdminToken(token);
}

