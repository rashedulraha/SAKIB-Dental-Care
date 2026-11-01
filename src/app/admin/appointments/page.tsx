"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAdmin } from "@/context/AdminContext";
import { CustomSelect } from "@/components/common/CustomSelect";

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
  doctorNotes: string | null;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const { L, refreshStats } = useAdmin();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [branchFilter, setBranchFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (branchFilter !== "ALL") params.set("branch", branchFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/admin/appointments?${params.toString()}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setAppointments(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, branchFilter, searchQuery]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
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
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        refreshStats();
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getWhatsAppConfirmLink = (apt: AppointmentItem) => {
    const cleanPhone = apt.patientPhone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("88")
      ? cleanPhone
      : cleanPhone.startsWith("0")
      ? "88" + cleanPhone
      : "880" + cleanPhone;

    const branchName =
      apt.branchKey === "nawhata"
        ? "Nowhata Bazar Branch / নওহাটা বাজার শাখা"
        : "Rajshahi City Sopura Branch / সপুরা শাখা";

    const msg = encodeURIComponent(
      `Assalamu Alaikum ${apt.patientName} Ji,\nYour dental serial #${apt.serialId} at Sakib Dental Care is CONFIRMED!\n\n📅 Date: ${apt.appointmentDate}\n⏰ Time: ${apt.timeSlot}\n📍 Branch: ${branchName}\n🦷 Service: ${apt.serviceTitle}\n\nFor any queries: 01733-054717.`
    );

    return `https://wa.me/${formattedPhone}?text=${msg}`;
  };

  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelledCount = appointments.filter((a) => a.status === "CANCELLED").length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {L("Patient Serials Queue", "রোগী সিরিয়াল ব্যবস্থাপনা")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Appointments & Serials", "সকল অ্যাপয়েন্টমেন্ট ও সিরিয়াল")}
          </h1>
          <p className="text-xs text-slate-400">
            {L(
              "Review online appointment bookings, confirm schedules, ping patients on WhatsApp, and manage records.",
              "অনলাইনে বুক করা সিরিয়ালসমূহ যাচাই করুন, হোয়াটসঅ্যাপে কনফার্মেশন পাঠান এবং স্ট্যাটাস আপডেট করুন।"
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchAppointments()}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all self-start md:self-auto cursor-pointer"
        >
          <i className={`ph-bold ph-arrows-clockwise text-sm ${loading ? "animate-spin text-sky-400" : ""}`} />
          <span>{L("Refresh Queue", "রিফ্রেশ করুন")}</span>
        </button>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="bg-[#0f172a] rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg space-y-4">
        {/* Search & Branch Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <i className="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={L(
                "Search by patient name, phone, or serial token (e.g. SDC-)...",
                "রোগীর নাম, ফোন নম্বর অথবা সিরিয়াল আইডি দিয়ে খুঁজুন..."
              )}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-slate-100 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <i className="ph-bold ph-x text-sm" />
              </button>
            )}
          </div>

          <div className="sm:w-64 shrink-0">
            <CustomSelect
              value={branchFilter}
              onChange={(val) => setBranchFilter(String(val))}
              options={[
                {
                  value: "ALL",
                  label: L("All Branches / উভয় চেম্বার", "উভয় চেম্বার (সবগুলো)"),
                  icon: "ph-buildings",
                },
                {
                  value: "nawhata",
                  label: L("Nowhata Bazar Branch", "নওহাটা বাজার শাখা (দিন)"),
                  icon: "ph-sun",
                  iconColor: "text-amber-400",
                },
                {
                  value: "city",
                  label: L("City Sopura Branch", "শহর সপুরা শাখা (সন্ধ্যা)"),
                  icon: "ph-moon-stars",
                  iconColor: "text-indigo-400",
                },
              ]}
              leadingIcon="ph-funnel"
              buttonClassName="bg-[#090f1d] border border-slate-700 text-slate-200 py-2.5 px-3.5 hover:border-slate-600 rounded-xl"
              menuClassName="bg-[#0f172a] border-slate-700"
            />
          </div>
        </div>

        {/* Status Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "ALL"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <span>{L("All Serials", "সব সিরিয়াল")}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-900/60 text-[10px]">
              {appointments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("PENDING")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "PENDING"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 font-black"
                : "bg-slate-800/80 text-amber-400 hover:bg-slate-700"
            }`}
          >
            <i className="ph-fill ph-clock-countdown text-xs" />
            <span>{L("Pending", "পেন্ডিং")}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{pendingCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("CONFIRMED")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "CONFIRMED"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                : "bg-slate-800/80 text-emerald-400 hover:bg-slate-700"
            }`}
          >
            <i className="ph-fill ph-check-circle text-xs" />
            <span>{L("Confirmed", "কনফার্মড")}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{confirmedCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("COMPLETED")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "COMPLETED"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                : "bg-slate-800/80 text-indigo-400 hover:bg-slate-700"
            }`}
          >
            <i className="ph-fill ph-seal-check text-xs" />
            <span>{L("Completed", "চিকিৎসা সম্পন্ন")}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{completedCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("CANCELLED")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "CANCELLED"
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/25"
                : "bg-slate-800/80 text-rose-400 hover:bg-slate-700"
            }`}
          >
            <i className="ph-fill ph-x-circle text-xs" />
            <span>{L("Cancelled", "বাতিল")}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{cancelledCount}</span>
          </button>
        </div>
      </div>

      {/* Appointment Cards / Table */}
      {loading ? (
        <div className="bg-[#0f172a] rounded-3xl p-12 border border-slate-800 text-center space-y-3">
          <i className="ph-bold ph-spinner animate-spin text-3xl text-sky-400" />
          <p className="text-sm text-slate-300 font-medium">
            {L("Loading appointments...", "সিরিয়াল তালিকা লোড হচ্ছে...")}
          </p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-[#0f172a] rounded-3xl p-12 border border-slate-800 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 text-slate-400 border border-slate-700 flex items-center justify-center text-2xl mx-auto">
            <i className="ph-duotone ph-calendar-x" />
          </div>
          <h3 className="text-base font-bold text-white">
            {L("No Serials Found", "কোনো সিরিয়াল পাওয়া যায়নি")}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || statusFilter !== "ALL" || branchFilter !== "ALL"
              ? L("Try adjusting your filters or search keywords.", "ফিল্টার বা সার্চ পরিবর্তন করে দেখুন।")
              : L("Patient serials will appear here as soon as appointments are booked online.", "রোগীরা অনলাইনে অ্যাপয়েন্টমেন্ট বুক করলেই এখানে প্রদর্শিত হবে।")}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {appointments.map((apt) => {
            const isNowhata = apt.branchKey === "nawhata";
            const isPending = apt.status === "PENDING";
            const isConfirmed = apt.status === "CONFIRMED";
            const isCompleted = apt.status === "COMPLETED";
            const isCancelled = apt.status === "CANCELLED";

            return (
              <div
                key={apt.id}
                className="bg-[#0f172a] rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-md hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left: Patient Info & Serial Badge */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/30">
                      {apt.serialId}
                    </span>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                        isConfirmed
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : isPending
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : isCompleted
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      <i
                        className={`ph-fill ${
                          isConfirmed
                            ? "ph-check-circle"
                            : isPending
                            ? "ph-clock-countdown"
                            : isCompleted
                            ? "ph-seal-check"
                            : "ph-x-circle"
                        } text-xs`}
                      />
                      <span>
                        {apt.status === "CONFIRMED"
                          ? L("CONFIRMED", "কনফার্মড")
                          : apt.status === "PENDING"
                          ? L("PENDING", "পেন্ডিং যাচাই")
                          : apt.status === "COMPLETED"
                          ? L("COMPLETED", "চিকিৎসা সম্পন্ন")
                          : L("CANCELLED", "বাতিল")}
                      </span>
                    </span>

                    {/* Branch Badge */}
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isNowhata
                          ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                          : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                      }`}
                    >
                      <i className={`ph-fill ${isNowhata ? "ph-sun" : "ph-moon-stars"} text-xs`} />
                      <span>{isNowhata ? L("Nowhata Branch", "নওহাটা শাখা") : L("Sopura City Branch", "সপুরা শহর শাখা")}</span>
                    </span>
                  </div>

                  {/* Name and Service */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{apt.patientName}</span>
                      {apt.patientAge && (
                        <span className="text-xs text-slate-400 font-normal">
                          ({apt.patientAge} {L("yrs", "বছর")})
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <i className="ph-bold ph-first-aid-kit text-sky-400" />
                      <span className="font-semibold text-white">{apt.serviceTitle}</span>
                    </p>
                  </div>

                  {/* Date, Time & Phone */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <i className="ph-fill ph-calendar text-sky-400" />
                      <span>{apt.appointmentDate}</span>
                    </span>

                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <i className="ph-fill ph-clock text-amber-400" />
                      <span>{apt.timeSlot}</span>
                    </span>

                    <a
                      href={`tel:${apt.patientPhone}`}
                      className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono font-bold hover:underline"
                    >
                      <i className="ph-fill ph-phone-call text-emerald-400" />
                      <span>{apt.patientPhone}</span>
                    </a>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800 shrink-0">
                  {/* WhatsApp Direct Confirmation Button */}
                  <a
                    href={getWhatsAppConfirmLink(apt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    title="Send WhatsApp confirmation message"
                  >
                    <i className="ph-fill ph-whatsapp-logo text-base text-emerald-400 group-hover:text-white" />
                    <span>{L("WhatsApp Ping", "হোয়াটসঅ্যাপ বার্তা")}</span>
                  </a>

                  {/* Status Toggle Actions */}
                  {apt.status !== "CONFIRMED" && (
                    <button
                      type="button"
                      disabled={updatingId === apt.id}
                      onClick={() => handleUpdateStatus(apt.id, "CONFIRMED")}
                      className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <i className="ph-bold ph-check text-xs" />
                      <span>{L("Confirm", "কনফার্ম")}</span>
                    </button>
                  )}

                  {apt.status !== "COMPLETED" && (
                    <button
                      type="button"
                      disabled={updatingId === apt.id}
                      onClick={() => handleUpdateStatus(apt.id, "COMPLETED")}
                      className="px-3 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <i className="ph-bold ph-seal-check text-xs" />
                      <span>{L("Done", "সম্পন্ন")}</span>
                    </button>
                  )}

                  {apt.status !== "CANCELLED" && (
                    <button
                      type="button"
                      disabled={updatingId === apt.id}
                      onClick={() => handleUpdateStatus(apt.id, "CANCELLED")}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <i className="ph-bold ph-x text-xs" />
                      <span>{L("Cancel", "বাতিল")}</span>
                    </button>
                  )}

                  {/* Delete Button */}
                  {deleteConfirmId === apt.id ? (
                    <div className="flex items-center gap-1.5 bg-rose-950/80 p-1 rounded-xl border border-rose-500/40">
                      <button
                        type="button"
                        onClick={() => handleDelete(apt.id)}
                        disabled={updatingId === apt.id}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer"
                      >
                        {L("Confirm Delete?", "মুছে ফেলবেন?")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] cursor-pointer"
                      >
                        {L("No", "না")}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(apt.id)}
                      className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 flex items-center justify-center transition-colors cursor-pointer"
                      title={L("Delete Record", "রেকর্ড মুছে ফেলুন")}
                    >
                      <i className="ph-bold ph-trash text-sm" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

