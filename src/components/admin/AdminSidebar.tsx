"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { L, pendingCount, sidebarOpen, setSidebarOpen, openLogoutModal } = useAdmin();

  const navItems = [
    {
      href: "/admin",
      exact: true,
      icon: "ph-squares-four",
      labelEn: "Overview",
      labelBn: "ড্যাশবোর্ড",
    },
    {
      href: "/admin/appointments",
      icon: "ph-calendar-check",
      labelEn: "Appointments",
      labelBn: "রোগী সিরিয়াল",
      badge: pendingCount > 0 ? pendingCount : null,
    },
    {
      href: "/admin/locations",
      icon: "ph-map-pin",
      labelEn: "Chambers & Locations",
      labelBn: "চেম্বার ও সময়সূচী",
    },
    {
      href: "/admin/notices",
      icon: "ph-megaphone",
      labelEn: "Emergency Notice",
      labelBn: "জরুরি নোটিশ",
    },
    {
      href: "/admin/services",
      icon: "ph-first-aid-kit",
      labelEn: "Dental Treatments",
      labelBn: "চিকিৎসা সেবা",
    },
    {
      href: "/admin/settings",
      icon: "ph-phone-call",
      labelEn: "Hotlines & Contacts",
      labelBn: "হটলাইন সেটিংস",
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Backdrop Dimmer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#090f1d] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <i className="ph-fill ph-tooth" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Sakib Dental Care
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">সাকিব ডেন্টাল কেয়ার</p>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <i className="ph-bold ph-x" />
          </button>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
            Navigation Menu
          </span>

          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`ph-bold ${item.icon} text-lg ${active ? "text-white" : "text-sky-400"}`} />
                  <span>{L(item.labelEn, item.labelBn)}</span>
                </div>

                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      active
                        ? "bg-white text-sky-600"
                        : "bg-amber-500 text-slate-950 shadow-sm font-black animate-pulse"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom: Quick Links & Logout */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 bg-[#060a14]">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-sky-400 flex items-center justify-between transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2">
              <i className="ph-bold ph-arrow-square-out text-sm" />
              <span>{L("Live Website", "মূল ওয়েবসাইট")}</span>
            </div>
            <i className="ph-bold ph-caret-right text-xs text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={openLogoutModal}
            className="w-full py-2.5 px-3.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <i className="ph-bold ph-sign-out text-sm" />
            <span>{L("Logout", "লগআউট করুন")}</span>
          </button>

          <div className="text-center pt-1">
            <span className="text-[10px] text-slate-400">Sakib Dental Care • v2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

