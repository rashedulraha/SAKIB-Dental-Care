import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { getJwtSecret } from "@/lib/auth/secret";

export const OTP_EXPIRATION_MS = 5 * 60 * 1000;
export const OTP_RESEND_INTERVAL_MS = 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  return randomInt(100_000, 1_000_000).toString();
}

export function hashOtp(email: string, code: string): string {
  return createHmac("sha256", getJwtSecret())
    .update(`${email}:${code}`)
    .digest("hex");
}

export function compareOtpHashes(actual: string, expected: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(actual) || !/^[a-f0-9]{64}$/i.test(expected)) {
    return false;
  }

  return timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
}

export async function sendAdminOtpEmail(email: string, code: string): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM_EMAIL || user;
  const fromName = process.env.SMTP_FROM_NAME || "Sakib Dental Care";
  const secureSetting = process.env.SMTP_SECURE?.toLowerCase();

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !user ||
    !password ||
    !from ||
    (secureSetting && secureSetting !== "true" && secureSetting !== "false")
  ) {
    throw new Error("SMTP_HOST, SMTP_USER, SMTP_PASSWORD, and valid SMTP_PORT must be configured.");
  }

  const secure = port === 465 || secureSetting === "true";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass: password },
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  try {
    await transporter.sendMail({
      from: { name: fromName, address: from },
      to: email,
      replyTo: from,
      subject: "Your Sakib Dental Care admin verification code",
      text: `Your admin verification code is ${code}. It expires in 5 minutes. If you did not request this code, you can ignore this email.`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033"><h2>Admin sign-in verification</h2><p>Enter this one-time code to finish signing in:</p><p style="font-size:30px;font-weight:700;letter-spacing:8px">${code}</p><p>This code expires in 5 minutes. If you did not request it, you can ignore this email.</p></div>`,
    });
  } finally {
    transporter.close();
  }
}
