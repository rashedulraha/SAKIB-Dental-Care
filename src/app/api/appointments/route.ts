import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      patientName,
      patientPhone,
      patientAge,
      patientAddress,
      branchKey,
      serviceId,
      serviceTitle,
      appointmentDate,
      timeSlot,
      patientNotes,
    } = body;

    if (!patientName || !patientPhone || !branchKey || !appointmentDate || !timeSlot) {
      return NextResponse.json(
        { success: false, message: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।" },
        { status: 400 }
      );
    }

    // Generate random 4-digit serial code (e.g. #SDC-7421)
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const serialId = `#SDC-${randNum}`;

    // Combine patient address & symptoms into notes cleanly
    const noteParts: string[] = [];
    if (patientAddress && String(patientAddress).trim()) {
      noteParts.push(`[ঠিকানা/এলাকা: ${String(patientAddress).trim()}]`);
    }
    if (patientNotes && String(patientNotes).trim()) {
      noteParts.push(String(patientNotes).trim());
    }
    const combinedNotes = noteParts.length > 0 ? noteParts.join("\n") : null;

    const appointment = await prisma.appointment.create({
      data: {
        serialId,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientAge: patientAge ? String(patientAge).trim() : null,
        branchKey: branchKey || "nawhata",
        serviceId: serviceId ? Number(serviceId) : null,
        serviceTitle: serviceTitle || "General Dental Care",
        appointmentDate: String(appointmentDate),
        timeSlot: String(timeSlot),
        patientNotes: combinedNotes,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "অ্যাপয়েন্টমেন্ট সফলভাবে ডাটাবেজে সংরক্ষণ করা হয়েছে!",
      serialId: appointment.serialId,
      data: appointment,
    });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { success: false, message: "ডাটাবেজে সংরক্ষণ করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}

