"use client";

import { useEffect, useState } from "react";
import { AdminAuthForm } from "@/components/admin/AdminAuthForm";

export function HiddenAdminAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      // Trigger / toggle modal on Escape key press
      if (event.key === "Escape" || event.code === "Escape") {
        event.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            setShowLogin(false);
            return false;
          }
          setShowLogin(false);
          return true;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-access-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-all"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
          setShowLogin(false);
        }
      }}
    >
      {showLogin ? (
        <AdminAuthForm onCancel={() => setShowLogin(false)} />
      ) : (
        <section className="w-full max-w-sm rounded-3xl border border-slate-800 bg-[#0f172a] p-6 text-center shadow-2xl sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/15 text-2xl text-sky-400">
            <i className="ph-fill ph-shield-check" aria-hidden="true" />
          </div>
          <h2 id="admin-access-title" className="mb-2 text-xl font-extrabold text-white">
            Restricted Admin Access
          </h2>
          <p className="mb-6 text-sm text-slate-400">
            Continue only if you are authorized to manage Sakib Dental Care.
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-600 hover:to-indigo-700 active:scale-[0.98]"
            >
              Continue to Dashboard
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl border border-slate-800 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-slate-800/50 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
