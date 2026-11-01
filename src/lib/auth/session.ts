import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sdc_default_secret_key_change_in_production_2026"
);

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
    .sign(JWT_SECRET);
}

/**
 * Verifies an incoming session token
 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
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

/**
 * Checks if entered password matches ADMIN_PASSWORD
 */
export function verifyAdminPassword(password: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim() || "SakibDental@2026";
  // Remove any surrounding quotes from .env if present
  const cleanConfigured = configuredPassword.replace(/^["']|["']$/g, "").trim();
  const cleanInput = (password || "").trim();
  return cleanInput.length > 0 && cleanInput === cleanConfigured;
}

