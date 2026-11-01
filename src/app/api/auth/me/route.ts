import { NextResponse } from "next/server";
import { getIsAdmin } from "@/lib/auth/session";

export async function GET() {
  const isAdmin = await getIsAdmin();
  return NextResponse.json({
    authenticated: isAdmin,
    role: isAdmin ? "admin" : null,
  });
}

