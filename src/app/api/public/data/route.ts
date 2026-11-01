import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { dentalServices as fallbackServices } from "@/data/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // 1. Fetch clinic settings
    const settingsRecord = await prisma.clinicSetting.findUnique({
      where: { key: "MAIN_CONFIG" },
    });

    let settings = null;
    if (settingsRecord?.value) {
      try {
        settings = JSON.parse(settingsRecord.value);
      } catch {
        settings = null;
      }
    }

    // 2. Fetch active services
    const services = await prisma.dentalService.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      settings,
      services: services.length > 0 ? services : fallbackServices,
    });
  } catch (error) {
    console.error("Public data fetch error:", error);
    // Return fallback with graceful status
    return NextResponse.json({
      success: true,
      settings: null,
      services: fallbackServices,
      isFallback: true,
    });
  }
}

