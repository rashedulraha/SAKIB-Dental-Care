import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getIsAdmin } from "@/lib/auth/session";

export async function GET(req: Request) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const branch = searchParams.get("branch");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (branch && branch !== "ALL") {
      where.branchKey = branch;
    }

    if (search) {
      where.OR = [
        { patientName: { contains: search, mode: "insensitive" } },
        { patientPhone: { contains: search } },
        { serialId: { contains: search, mode: "insensitive" } },
      ];
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: appointments,
      count: appointments.length,
    });
  } catch (error) {
    console.error("Admin appointments fetch error:", error);
    return NextResponse.json(
      { success: false, message: "ডাটাবেজ থেকে অ্যাপয়েন্টমেন্ট আনতে ব্যর্থ।" },
      { status: 500 }
    );
  }
}

