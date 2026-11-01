"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { toBanglaDigits } from "@/data/translations";

export interface AppointmentSlipData {
  serialId: string;
  patientName: string;
  patientAge?: string;
  patientPhone: string;
  patientAddress?: string;
  branchName: string;
  branchAddress: string;
  branchHours: string;
  serviceTitle: string;
  serviceDuration?: string;
  appointmentDate: string;
  timeSlot: string;
  patientNotes?: string;
  hotline: string;
  whatsappNumber: string;
  whatsappUrl?: string;
}

interface AppointmentSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppointmentSlipData;
  isConfirmed?: boolean;
}

export const AppointmentSlipModal: React.FC<AppointmentSlipModalProps> = ({
  isOpen,
  onClose,
  data,
  isConfirmed = false,
}) => {
  const { currentLang, t } = useLanguage();
  const { showToast } = useToast();
  const isBn = currentLang === "bn";

  const [issueTimestamp, setIssueTimestamp] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString(isBn ? "bn-BD" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    setIssueTimestamp(formatted);
  }, [isOpen, isBn]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const summary = `${data.branchName}
${isBn ? "সিরিয়াল আইডি" : "Serial ID"}: ${data.serialId}
${isBn ? "রোগীর নাম" : "Patient"}: ${data.patientName} (${data.patientAge ? `${data.patientAge} ${isBn ? "বছর" : "yrs"}` : "-"})
${isBn ? "মোবাইল" : "Mobile"}: ${data.patientPhone}
${data.patientAddress ? `${isBn ? "ঠিকানা" : "Address"}: ${data.patientAddress}\n` : ""}${isBn ? "তারিখ" : "Date"}: ${data.appointmentDate} • ${data.timeSlot}
${isBn ? "চিকিৎসা" : "Service"}: ${data.serviceTitle}
${isBn ? "সিরিয়াল হটলাইন" : "Hotline"}: ${data.hotline}`;

    navigator.clipboard
      .writeText(summary)
      .then(() => {
        showToast(
          isBn ? "কপি সম্পন্ন হয়েছে!" : "Copied!",
          isBn ? "সিরিয়াল স্লিপের তথ্য ক্লিপবোর্ডে কপি হয়েছে।" : "Serial pass details copied."
        );
      })
      .catch(() => {});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slip-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/80 backdrop-blur-md transition-all"
    >
      {/* Background overlay click-to-close */}
      <div
        className="fixed inset-0 cursor-pointer no-print"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl my-auto z-10 space-y-3">
        {/* Top Floating Control Bar (Hidden when printed) */}
        <div className="no-print apple-glass-strong rounded-2xl px-4 py-3 border border-white/20 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConfirmed ? "bg-emerald-500 animate-ping" : "bg-sky-500"
              }`}
            />
            <span className="font-extrabold text-white text-sm sm:text-base">
              {isConfirmed
                ? isBn
                  ? "সিরিয়াল নিশ্চিত করা হয়েছে!"
                  : "Serial Pass Confirmed!"
                : t("slipModalTitle")}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-sky-500/25 transition-all cursor-pointer active:scale-95"
              title="Print official appointment pass or save as PDF"
            >
              <i className="ph-bold ph-printer text-base" />
              <span>{t("slipPrintBtn")}</span>
            </button>

            {/* WhatsApp Link if available */}
            {data.whatsappUrl && (
              <a
                href={data.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                title="Send serial details via WhatsApp"
              >
                <i className="ph-fill ph-whatsapp-logo text-base" />
                <span className="hidden xs:inline">{t("slipWhatsAppBtn")}</span>
              </a>
            )}

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy slip summary"
            >
              <i className="ph-bold ph-copy text-sm" />
              <span className="hidden sm:inline">{t("slipCopyBtn")}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer ml-1"
              aria-label="Close dialog"
            >
              <i className="ph-bold ph-x text-base" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OFFICIAL PRINTABLE APPOINTMENT SLIP (TARGET FOR BROWSER PRINT) */}
        {/* ============================================================== */}
        <div
          id="printableAppointmentSlip"
          className="bg-white text-slate-900 rounded-3xl p-5 sm:p-8 border-2 border-sky-600/40 shadow-2xl relative overflow-hidden font-sans space-y-4"
        >
          {/* Top Decorative Accent Header Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 rounded-full" />

          {/* 1. Official Letterhead / Brand Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                <i className="ph-fill ph-tooth" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    SAKIB DENTAL CARE
                  </h1>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-sky-700">
                  সাকিব ডেন্টাল কেয়ার • আধুনিক ডিজিটাল চেম্বার
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-600 max-w-md mt-0.5 leading-relaxed">
                  {isBn
                    ? "১০০% জীবাণুমুক্ত পরিবেশে আধুনিক ডিজিটাল চিকিৎসা ও যত্ন সহকারে দাঁতের এক্স-রে (ছবি) করা হয়।"
                    : "Ultra-modern sterilization, comprehensive oral healthcare & specialized Dental X-Ray (Imaging)."}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 space-y-0.5 text-xs text-slate-700">
              <p className="font-bold text-slate-900 flex sm:justify-end items-center gap-1.5">
                <i className="ph-fill ph-phone-call text-sky-600 text-sm" />
                <span>{isBn ? "সিরিয়াল হটলাইন:" : "Hotline:"}</span>
                <span className="font-mono font-extrabold text-sky-700">{data.hotline}</span>
              </p>
              <p className="font-semibold text-slate-700 flex sm:justify-end items-center gap-1.5">
                <i className="ph-fill ph-whatsapp-logo text-emerald-600 text-sm" />
                <span>WhatsApp:</span>
                <span className="font-mono">{data.whatsappNumber}</span>
              </p>
              <p className="text-[11px] text-slate-500 flex sm:justify-end items-center gap-1">
                <i className="ph-bold ph-globe text-slate-400" />
                <span>sakibdentalcare.com • Rajshahi</span>
              </p>
            </div>
          </div>

          {/* 2. Official Serial Pass Ribbon */}
          <div className="rounded-2xl bg-sky-50/90 border border-sky-200/80 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-sky-800">
                  {isBn
                    ? "অফিসিয়াল ডিজিটাল সিরিয়াল পাস"
                    : "Official Digital Appointment Pass"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                  ● {isBn ? "কনফার্মড টোকেন" : "CONFIRMED"}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {isBn ? "ইস্যু সময়:" : "Issued On:"}{" "}
                <span className="font-medium">{issueTimestamp || data.appointmentDate}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">
                {isBn ? "সিরিয়াল নাম্বার" : "Serial Pass Number"}
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-sky-700 tracking-tight">
                {data.serialId}
              </span>
            </div>
          </div>

          {/* 3. Chamber & Appointment Schedule Box */}
          <div className="rounded-2xl bg-slate-50/90 border border-slate-200 p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs">
                  <i className="ph-fill ph-buildings" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {data.branchName}
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300/60">
                <i className="ph-bold ph-clock mr-1" />
                {data.branchHours}
              </span>
            </div>

            <p className="text-xs text-slate-600 flex items-start gap-1.5">
              <i className="ph-fill ph-map-pin text-rose-500 text-sm shrink-0 mt-0.5" />
              <span>{data.branchAddress}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <i className="ph-fill ph-calendar text-base" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    {isBn ? "অ্যাপয়েন্টমেন্ট তারিখ" : "Appointment Date"}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {data.appointmentDate}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <i className="ph-fill ph-clock-countdown text-base" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    {isBn ? "রোগী দেখার সময় / শিফট" : "Scheduled Slot"}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-700">
                    {data.timeSlot}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Patient Information Grid */}
          <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <i className="ph-fill ph-user-circle text-sky-600 text-sm" />
              <span>{isBn ? "রোগীর বিবরণ ও চিকিৎসাসেবা" : "Patient Information & Service"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Name */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">
                  {isBn ? "রোগীর নাম" : "Patient Name"}
                </span>
                <p className="font-extrabold text-sm text-slate-900 mt-0.5 truncate">
                  {data.patientName}
                </p>
              </div>

              {/* Age */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">
                  {isBn ? "বয়স" : "Age"}
                </span>
                <p className="font-extrabold text-sm text-slate-900 mt-0.5">
                  {data.patientAge
                    ? isBn
                      ? `${toBanglaDigits(data.patientAge)} বছর`
                      : `${data.patientAge} Years`
                    : "-"}
                </p>
              </div>

              {/* Mobile Phone */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">
                  {isBn ? "মোবাইল নম্বর" : "Mobile Phone"}
                </span>
                <p className="font-extrabold text-sm font-mono text-slate-900 mt-0.5">
                  {data.patientPhone}
                </p>
              </div>

              {/* Address / Location */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">
                  {isBn ? "রোগীর ঠিকানা / এলাকা" : "Patient Address / Area"}
                </span>
                <p className="font-extrabold text-sm text-slate-900 mt-0.5 truncate">
                  {data.patientAddress || (isBn ? "উল্লেখ নেই" : "Not specified")}
                </p>
              </div>
            </div>

            {/* Treatment Service */}
            <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200/70 flex items-start gap-2.5">
              <i className="ph-fill ph-first-aid-kit text-sky-600 text-lg shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase text-sky-800 block">
                  {isBn ? "নির্বাচিত চিকিৎসা সেবা" : "Selected Treatment Service"}
                </span>
                <p className="font-bold text-xs sm:text-sm text-slate-900">
                  {data.serviceTitle}
                  {data.serviceDuration && (
                    <span className="ml-2 font-normal text-xs text-sky-700">
                      ({data.serviceDuration})
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Optional Note */}
            {data.patientNotes && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {isBn ? "সমস্যার সংক্ষিপ্ত বিবরণ" : "Symptom / Problem Note"}
                </span>
                <p className="text-slate-700 mt-0.5 italic">
                  "{data.patientNotes}"
                </p>
              </div>
            )}
          </div>

          {/* 5. Essential Patient Guidelines */}
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200/70 p-3.5 space-y-1.5 text-xs">
            <h4 className="font-extrabold text-amber-900 flex items-center gap-1.5">
              <i className="ph-fill ph-info text-amber-600 text-sm" />
              <span>{t("slipGuidelinesHeading")}</span>
            </h4>
            <ul className="space-y-1 text-[11px] sm:text-xs text-amber-950 pl-5 list-decimal leading-relaxed">
              <li>{t("slipGuideline1")}</li>
              <li>{t("slipGuideline2")}</li>
              <li>{t("slipGuideline3")}</li>
            </ul>
          </div>

          {/* 6. Footer Verification & Signature Area */}
          <div className="pt-3 border-t border-dashed border-slate-300 flex items-center justify-between gap-4 text-xs">
            {/* Barcode & Verification */}
            <div className="space-y-1">
              <div className="font-mono tracking-widest text-slate-500 text-base font-black select-none">
                ||| | |||| | ||| | ||||| | || | ||||
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                TOKEN VERIFICATION: {data.serialId} • SAKIB-DENTAL
              </p>
            </div>

            {/* Authorized Signature Box */}
            <div className="text-right shrink-0">
              <div className="w-36 sm:w-44 border-b border-slate-400 pb-1 mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                {isBn ? "অনুমোদিত সিল ও স্বাক্ষর" : "Authorized Seal & Signature"}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold">
                Sakib Dental Care Chamber
              </p>
            </div>
          </div>

          {/* Micro Legal Footer */}
          <div className="text-center pt-1 border-t border-slate-100">
            <p className="text-[9px] text-slate-400">
              {isBn
                ? "এটি একটি কম্পিউটার-জেনারেটেড ডিজিটাল অ্যাপয়েন্টমেন্ট সিরিয়াল স্লিপ। চেম্বারের রিসেপশনে প্রদর্শনের জন্য গ্রহণযোগ্য।"
                : "This is an official computer-generated digital appointment serial pass. Please present it at the chamber reception."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
