"use client";

import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DoctorSlipData, generateDoctorSlipHtml, printDoctorSlip } from "@/lib/printDoctorSlip";

interface PrintConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DoctorSlipData;
}

export const PrintConfirmModal: React.FC<PrintConfirmModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const { currentLang } = useLanguage();
  const isBn = currentLang === "bn";

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

  const handleConfirmPrint = () => {
    const slipHtml = generateDoctorSlipHtml(data, isBn);
    printDoctorSlip(slipHtml);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Small Compact Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 z-10 text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl shrink-0">
              <i className="ph-fill ph-printer" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {isBn ? "সিরিয়াল স্লিপ প্রিন্ট করুন" : "Print Appointment Slip"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isBn ? "সিঙ্গেল পেজে ডক্টরস প্রেসক্রিপশন স্লিপ" : "1-Page Doctor's Chamber Slip Format"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-500 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <i className="ph-bold ph-x text-sm" />
          </button>
        </div>

        {/* Quick Summary Card */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/80 dark:border-slate-700 space-y-2.5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
            <span className="font-bold text-slate-500 dark:text-slate-400">
              {isBn ? "সিরিয়াল আইডি" : "Serial ID"}
            </span>
            <span className="font-mono font-black text-sky-600 dark:text-sky-400 text-sm">
              {data.serialId}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-200">
            <div>
              <span className="text-slate-400 block text-[11px]">{isBn ? "রোগীর নাম" : "Patient Name"}</span>
              <p className="font-bold truncate mt-0.5">{data.patientName} {data.patientAge ? `(${data.patientAge})` : ""}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{isBn ? "মোবাইল" : "Mobile"}</span>
              <p className="font-bold truncate mt-0.5">{data.patientPhone}</p>
            </div>
          </div>

          {data.patientAddress && (
            <div>
              <span className="text-slate-400 block text-[11px]">{isBn ? "ঠিকানা / এলাকা" : "Address"}</span>
              <p className="font-medium text-slate-800 dark:text-slate-300 truncate mt-0.5">{data.patientAddress}</p>
            </div>
          )}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="font-semibold truncate">{data.branchName}</span>
            <span className="font-mono font-bold text-sky-600 dark:text-sky-400 shrink-0">
              {data.appointmentDate} • {data.timeSlot}
            </span>
          </div>
        </div>

        {/* Benefits Notes */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            <i className="ph-bold ph-check-circle text-sm" />
            <span>{isBn ? "নিখুঁত ১টি সিঙ্গেল পেজে (A4) প্রিন্ট হবে" : "Prints exactly on 1 single page (A4)"}</span>
          </div>
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold">
            <i className="ph-bold ph-floppy-disk text-sm" />
            <span>{isBn ? "প্রিন্টার না থাকলে লোকাল ড্রাইভে 'Save as PDF' করতে পারবেন" : "Can save directly to your computer as PDF"}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleConfirmPrint}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <i className="ph-bold ph-printer text-base" />
            <span>{isBn ? "কনফার্ম ও প্রিন্ট করুন" : "Confirm & Print Slip"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer"
          >
            {isBn ? "বাতিল" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};
