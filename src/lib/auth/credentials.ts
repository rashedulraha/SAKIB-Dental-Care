import { createHash, timingSafeEqual } from "node:crypto";

export interface AdminCredentials {
  email: string;
  password: string;
}

export function getAdminCredentials(): AdminCredentials | null {
  const email = (process.env.ADMIN_EMAIL || "sakibdentalcare1@gmail.com").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "SakibDental@2026";

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

export function matchesSecret(input: string, expected: string): boolean {
  const inputHash = createHash("sha256").update(input).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(inputHash, expectedHash);
}

export function verifyAdminCredentials(
  email: string,
  password: string,
  credentials: AdminCredentials
): boolean {
  const emailMatches = matchesSecret(email.trim().toLowerCase(), credentials.email);
  const passwordMatches = matchesSecret(password, credentials.password);
  return emailMatches && passwordMatches;
}
