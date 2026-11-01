import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getIsAdmin } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const record = await prisma.clinicSetting.findUnique({
      where: { key: "MAIN_CONFIG" },
    });

    let settings = {};
    if (record?.value) {
      try {
        settings = JSON.parse(record.value);
      } catch {
        settings = {};
      }
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Admin settings get error:", error);
    return NextResponse.json(
      { success: false, message: "সেটিংস লোড করতে ব্যর্থ।" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const newSettings = await req.json();

    const record = await prisma.clinicSetting.upsert({
      where: { key: "MAIN_CONFIG" },
      update: {
        value: JSON.stringify(newSettings),
      },
      create: {
        key: "MAIN_CONFIG",
        value: JSON.stringify(newSettings),
      },
    });

    return NextResponse.json({
      success: true,
      message: "ক্লিনিক সেটিংস ও লোকেশন সফলভাবে ডাটাবেজে আপডেট হয়েছে!",
      data: JSON.parse(record.value),
    });
  } catch (error) {
    console.error("Admin settings update error:", error);
    return NextResponse.json(
      { success: false, message: "সেটিংস সংরক্ষণ করতে ব্যর্থ।" },
      { status: 500 }
    );
  }
}

