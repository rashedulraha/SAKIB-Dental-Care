"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

interface AppointmentItem {
  id: string;
  serialId: string;
  patientName: string;
  patientPhone: string;
  patientAge: string | null;
  branchKey: string;
  serviceTitle: string;
  appointmentDate: string;
  timeSlot: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export default function AdminOverviewPage() {
  const { L, refreshStats } = useAdmin();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      if (res.ok && data.success) {
        setAppointments(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus as any } : a))
        );
        refreshStats();
      }
    } catch (e) {
      // ignore
    }
  };

  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;

  const recentFive = appointments.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {L("Overview & Management", "ক্লিনিক ড্যাশবোর্ড")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Sakib Dental Care Dashboard", "সাকিব ডেন্টাল কেয়ার ড্যাশবোর্ড")}
          </h1>
          <p className="text-xs text-slate-400">
            {L(
              "Manage patient serials, chamber hours, notice banner, and dental treatments.",
              "রোগী সিরিয়াল, চেম্বার সময়সূচী, নোটিশ ব্যানার এবং চিকিৎসা সেবা পরিচালনা করুন।"
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/admin/appointments"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-sky-500/25 flex items-center gap-1.5 transition-all"
          >
            <i className="ph-bold ph-plus-circle text-sm" />
            <span>{L("Manage Serials", "সকল সিরিয়াল দেখুন")}</span>
          </Link>
          <Link
            href="/admin/locations"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <i className="ph-bold ph-map-pin text-sm text-rose-400" />
            <span>{L("Chambers & Hours", "চেম্বার ও সময়")}</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#0f172a] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border border-slate-800 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center justify-center text-2xl shrink-0">
            <i className="ph-fill ph-calendar-check" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {L("Total Serials", "মোট সিরিয়াল")}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{totalCount}</span>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border border-slate-800 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
            <i className="ph-fill ph-clock-countdown" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {L("Pending Review", "পেন্ডিং যাচাই")}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">{pendingCount}</span>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border border-slate-800 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center text-2xl shrink-0">
            <i className="ph-fill ph-check-circle" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {L("Confirmed Patients", "কনফার্মড রোগী")}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-400">{confirmedCount}</span>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border border-slate-800 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl shrink-0">
            <i className="ph-fill ph-seal-check" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {L("Completed Visits", "চিকিৎসা সম্পন্ন")}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">{completedCount}</span>
          </div>
        </div>
      </div>

      {/* Dual Chamber Live Operational Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nowhata */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 text-[10px] font-bold uppercase border border-sky-500/25">
              <i className="ph-fill ph-sun" />
              <span>Day Shift</span>
            </span>
            <h3 className="text-base font-bold text-white">Nowhata Bazar Branch</h3>
            <p className="text-xs text-slate-400">9:00 AM – 9:00 PM (Friday Closed)</p>
          </div>
          <Link
            href="/admin/locations"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-slate-700 transition-colors"
          >
            {L("Edit", "এডিট")}
          </Link>
        </div>

        {/* City Sopura */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-[10px] font-bold uppercase border border-indigo-500/25">
              <i className="ph-fill ph-moon-stars" />
              <span>Evening Shift</span>
            </span>
            <h3 className="text-base font-bold text-white">Rajshahi City Branch (Sopura)</h3>
            <p className="text-xs text-slate-400">5:00 PM – 10:00 PM (Friday Closed)</p>
          </div>
          <Link
            href="/admin/locations"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400 border border-slate-700 transition-colors"
          >
            {L("Edit", "এডিট")}
          </Link>
        </div>
      </div>

      {/* Recent 5 Appointments Queue */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="ph-bold ph-clock-counter-clockwise text-sky-400 text-xl" />
              <span>{L("Recent Appointment Requests", "সর্বশেষ রোগী সিরিয়াল")}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {L("Showing latest patient serial requests.", "সর্বশেষ অনলাইনে বুক করা রোগী সিরিয়াল।")}
            </p>
          </div>

          <Link
            href="/admin/appointments"
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>{L("View All", "সম্পূর্ণ তালিকা")}</span>
            <i className="ph-bold ph-caret-right" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <i className="ph-bold ph-spinner animate-spin text-2xl text-sky-400" />
            <p className="text-xs">{L("Loading...", "লোড হচ্ছে...")}</p>
          </div>
        ) : recentFive.length === 0 ? (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <i className="ph-duotone ph-calendar-blank text-3xl text-slate-600" />
            <p className="text-xs">{L("No appointments recorded yet.", "কোনো সিরিয়াল এখনো নেই।")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentFive.map((apt) => {
              const isNowhata = apt.branchKey === "nawhata";
              return (
                <div
                  key={apt.id}
                  className="bg-[#0b1322] rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                        {apt.serialId}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          apt.status === "CONFIRMED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : apt.status === "PENDING"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : apt.status === "COMPLETED"
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{apt.patientName}</span>
                      <a href={`tel:${apt.patientPhone}`} className="text-xs text-sky-400 font-semibold hover:underline">
                        ({apt.patientPhone})
                      </a>
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>{isNowhata ? "Nowhata Branch" : "City Sopura Branch"}</span>
                      <span>•</span>
                      <span className="text-teal-400">{apt.serviceTitle}</span>
                      <span>•</span>
                      <span className="text-white font-medium">{apt.appointmentDate} ({apt.timeSlot})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {apt.status === "PENDING" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(apt.id, "CONFIRMED")}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        {L("Confirm", "কনফার্ম")}
                      </button>
                    )}
                    <a
                      href={`https://wa.me/88${apt.patientPhone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold inline-flex items-center gap-1 transition-all"
                    >
                      <i className="ph-fill ph-whatsapp-logo" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
