"use client";

import React, { useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

export const LogoutModal: React.FC = () => {
  const { isLogoutModalOpen, isLoggingOut, closeLogoutModal, confirmLogout, L } = useAdmin();

  // Close on Escape key
  useEffect(() => {
    if (!isLogoutModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoggingOut) {
        closeLogoutModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLogoutModalOpen, isLoggingOut, closeLogoutModal]);

  if (!isLogoutModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={() => {
        if (!isLoggingOut) closeLogoutModal();
      }}
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#0f172a] border border-slate-700/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden text-slate-100 transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Warning Icon Crest */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center text-3xl shadow-inner shadow-rose-500/20">
          <i className="ph-bold ph-sign-out" />
        </div>

        {/* Modal Heading */}
        <div className="text-center mt-4 space-y-2">
          <h3 id="logout-modal-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Confirm Logout", "লগআউট নিশ্চিতকরণ")}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {L(
              "Are you sure you want to end your session? You will be strictly required to enter your admin password again to access the portal.",
              "আপনি কি নিশ্চিতভাবে আপনার সেশন সমাপ্ত করতে চান? ড্যাশবোর্ডে পুনরায় প্রবেশ করতে পাসওয়ার্ড প্রদান করতে হবে।"
            )}
          </p>
        </div>

        {/* Security Notice Pill */}
        <div className="mt-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
          <i className="ph-fill ph-shield-check text-sky-400 text-base shrink-0" />
          <span>
            {L(
              "Browser session and authentication cookies will be wiped cleanly.",
              "ব্রাউজার সেশন ও নিরাপত্তা কুকি তাৎক্ষণিকভাবে মুছে ফেলা হবে।"
            )}
          </span>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={closeLogoutModal}
            disabled={isLoggingOut}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {L("Cancel", "বাতিল")}
          </button>

          <button
            type="button"
            onClick={confirmLogout}
            disabled={isLoggingOut}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-98 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <i className="ph-bold ph-spinner animate-spin text-base" />
                <span>{L("Logging out...", "লগআউট হচ্ছে...")}</span>
              </>
            ) : (
              <>
                <i className="ph-bold ph-sign-out text-base" />
                <span>{L("Log Out", "লগআউট")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

