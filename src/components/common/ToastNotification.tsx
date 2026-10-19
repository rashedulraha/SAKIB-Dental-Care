"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";

export const ToastNotification: React.FC = () => {
  const { toast } = useToast();

  return (
    <div
      id="toastNotification"
      className={`fixed top-20 right-4 z-50 transform transition-transform duration-300 apple-glass-strong rounded-2xl px-5 py-4 shadow-2xl border-l-4 border-l-emerald-500 flex items-center gap-3 max-w-sm ${
        toast.visible ? "translate-x-0" : "translate-x-[150%]"
      }`}
    >
      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-xl">
        <i className="ph-fill ph-check-circle" />
      </div>
      <div>
        <h4 id="toastTitle" className="text-sm font-bold text-slate-900 dark:text-white">
          {toast.title}
        </h4>
        <p id="toastMessage" className="text-xs text-slate-600 dark:text-slate-300">
          {toast.message}
        </p>
      </div>
    </div>
  );
};
