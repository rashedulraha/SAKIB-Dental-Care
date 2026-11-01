"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export const AdminTopNav: React.FC = () => {
  const { adminLang, setAdminLang, toggleSidebar, L, openLogoutModal } = useAdmin();
  const [timeStr, setTimeStr] = useState<string>("--:-- --");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 px-4 sm:px-6 bg-[#090f1d] border-b border-slate-800/80 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm shrink-0">
      {/* Left: Mobile Toggle & Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/80"
          title="Open Menu"
        >
          <i className="ph-bold ph-list text-lg" />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{L("System Online", "সিস্টেম সক্রিয়")}</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <i className="ph-fill ph-clock text-sky-400" />
          <span className="font-mono text-slate-300 font-bold">{timeStr}</span>
        </div>
      </div>

      {/* Right: Language Switcher, Live Link, Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector */}
        <div className="flex items-center bg-[#050912] p-1 rounded-xl border border-slate-700/80 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAdminLang("dual")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              adminLang === "dual" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Dual
          </button>
          <button
            type="button"
            onClick={() => setAdminLang("en")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              adminLang === "en" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setAdminLang("bn")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              adminLang === "bn" ? "bg-sky-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            বাংলা
          </button>
        </div>

        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-slate-700/80 transition-colors shadow-sm"
        >
          <i className="ph-bold ph-globe text-sm" />
          <span>{L("Live Site", "ওয়েবসাইট")}</span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          onClick={openLogoutModal}
          className="w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          title="Logout"
        >
          <i className="ph-bold ph-sign-out text-sm" />
          <span className="hidden sm:inline">{L("Logout", "লগআউট")}</span>
        </button>
      </div>
    </header>
  );
};
