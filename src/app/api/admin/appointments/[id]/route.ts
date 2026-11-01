import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getIsAdmin } from "@/lib/auth/session";

export async function PATCH(
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
    const { status, doctorNotes } = body;

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(doctorNotes !== undefined ? { doctorNotes } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: "অ্যাপয়েন্টমেন্ট সফলভাবে আপডেট হয়েছে!",
      data: updated,
    });
  } catch (error) {
    console.error("Admin appointment update error:", error);
    return NextResponse.json(
      { success: false, message: "আপডেট করতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "অ্যাপয়েন্টমেন্ট সফলভাবে মুছে ফেলা হয়েছে!",
    });
  } catch (error) {
    console.error("Admin appointment delete error:", error);
    return NextResponse.json(
      { success: false, message: "মুছে ফেলতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}

