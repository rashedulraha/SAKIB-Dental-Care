import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getIsAdmin } from "@/lib/auth/session";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const serviceId = parseInt(id, 10);

    const updated = await prisma.dentalService.update({
      where: { id: serviceId },
      data: {
        titleEn: body.titleEn,
        titleBn: body.titleBn,
        shortDescEn: body.shortDescEn,
        shortDescBn: body.shortDescBn,
        durationEn: body.durationEn,
        durationBn: body.durationBn,
        careTipEn: body.careTipEn,
        careTipBn: body.careTipBn,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "চিকিৎসা সেবা সফলভাবে ডাটাবেজে আপডেট হয়েছে!",
      data: updated,
    });
  } catch (error) {
    console.error("Admin service update error:", error);
    return NextResponse.json(
      { success: false, message: "সার্ভিস আপডেট করতে ব্যর্থ।" },
      { status: 500 }
    );
  }
}

