import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getIsAdmin } from "@/lib/auth/session";

export async function GET() {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await prisma.dentalService.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Admin services fetch error:", error);
    return NextResponse.json(
      { success: false, message: "সার্ভিস লোড করতে ব্যর্থ।" },
      { status: 500 }
    );
  }
}

