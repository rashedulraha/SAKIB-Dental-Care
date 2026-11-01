"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

interface DentalServiceItem {
  id: number;
  titleEn: string;
  titleBn: string;
  shortDescEn: string;
  shortDescBn: string;
  category: string;
  durationEn: string;
  durationBn: string;
  careTipEn: string;
  careTipBn: string;
  iconName: string;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const { L } = useAdmin();
  const [services, setServices] = useState<DentalServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<DentalServiceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (res.ok && json.success) {
        setServices(json.data || []);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleActive = async (service: DentalServiceItem) => {
    const newActive = !service.isActive;
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...service,
          isActive: newActive,
        }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, isActive: newActive } : s))
        );
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${editingService.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? editingService : s))
        );
        setSavedMessage(L("Treatment saved successfully!", "চিকিৎসা সেবা সফলভাবে সংরক্ষিত হয়েছে!"));
        setEditingService(null);
        setTimeout(() => setSavedMessage(null), 4000);
      }
    } catch (err) {
      console.error("Save service error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            {L("Dental Treatments", "ডেন্টাল চিকিৎসা সেবা")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Dental Treatments & Procedures", "ডেন্টাল ট্রিটমেন্ট ও সেবাসমূহ")}
          </h1>
          <p className="text-xs text-slate-400">
            {L(
              "Manage all 10 dental treatments, descriptions, procedure durations, and post-care advice.",
              "১০টি বিশেষায়িত ডেন্টাল সেবার বিবরণ, আনুমানিক সময় এবং চিকিৎসা পরবর্তী পরামর্শ আপডেট করুন।"
            )}
          </p>
        </div>

        {savedMessage && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <i className="ph-bold ph-check-circle text-base text-emerald-400" />
            <span>{savedMessage}</span>
          </div>
        )}
      </div>

      {/* Services List */}
      {loading ? (
        <div className="bg-[#0f172a] rounded-3xl p-12 border border-slate-800 text-center space-y-3">
          <i className="ph-bold ph-spinner animate-spin text-3xl text-teal-400" />
          <p className="text-sm text-slate-300 font-medium">
            {L("Loading clinical services...", "চিকিৎসা সেবাসমূহ লোড হচ্ছে...")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((srv) => (
            <div
              key={srv.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between gap-4 ${
                srv.isActive
                  ? "bg-[#0f172a] border-slate-800 hover:border-slate-700 shadow-lg"
                  : "bg-[#090e1b]/60 border-slate-800/40 opacity-70"
              }`}
            >
              <div className="space-y-3">
                {/* Header: Icon, Category & Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30 flex items-center justify-center text-xl">
                      <i className={`ph-bold ${srv.iconName || "ph-tooth"}`} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {srv.category}
                      </span>
                    </div>
                  </div>

                  {/* Active Switch */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {srv.isActive ? L("Active", "সক্রিয়") : L("Hidden", "লুকানো")}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(srv)}
                      className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                        srv.isActive ? "bg-teal-500" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${
                          srv.isActive ? "left-[19px]" : "left-[3px]"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{srv.titleEn}</h3>
                  <p className="text-xs text-sky-400 font-semibold">{srv.titleBn}</p>
                </div>

                {/* Short Desc */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {srv.shortDescEn}
                </p>

                {/* Duration & Care Tip preview */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-amber-300 font-medium bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    <i className="ph-fill ph-clock" />
                    <span>{srv.durationEn}</span>
                  </span>
                </div>
              </div>

              {/* Bottom: Edit Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setEditingService({ ...srv })}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <i className="ph-bold ph-pencil-simple text-sm" />
                  <span>{L("Edit Details", "সম্পাদনা করুন")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal Dialog */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0f172a] rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  {L("Editing Dental Treatment", "চিকিৎসা সেবা সম্পাদনা")}
                </span>
                <h2 className="text-lg font-bold text-white">{editingService.titleEn}</h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <i className="ph-bold ph-x text-base" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Title EN & BN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {L("Title (English)", "নাম (ইংরেজি)")}
                  </label>
                  <input
                    type="text"
                    value={editingService.titleEn}
                    onChange={(e) =>
                      setEditingService({ ...editingService, titleEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {L("Title (Bengali)", "নাম (বাংলা)")}
                  </label>
                  <input
                    type="text"
                    value={editingService.titleBn}
                    onChange={(e) =>
                      setEditingService({ ...editingService, titleBn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Description EN */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  {L("Short Description (English)", "সংক্ষিপ্ত বিবরণ (ইংরেজি)")}
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDescEn}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Description BN */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  {L("Short Description (Bengali)", "সংক্ষিপ্ত বিবরণ (বাংলা)")}
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDescBn}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescBn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              {/* Duration EN & BN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {L("Duration (English)", "সময়কাল (ইংরেজি)")}
                  </label>
                  <input
                    type="text"
                    value={editingService.durationEn}
                    onChange={(e) =>
                      setEditingService({ ...editingService, durationEn: e.target.value })
                    }
                    placeholder="e.g. 30 - 45 Mins"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {L("Duration (Bengali)", "সময়কাল (বাংলা)")}
                  </label>
                  <input
                    type="text"
                    value={editingService.durationBn}
                    onChange={(e) =>
                      setEditingService({ ...editingService, durationBn: e.target.value })
                    }
                    placeholder="যেমন: ৩০ - ৪৫ মিনিট"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Care Tips EN & BN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {L("Post-Care Advice (English)", "চিকিৎসা পরবর্তী যত্ন (ইংরেজি)")}
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.careTipEn}
                    onChange={(e) =>
                      setEditingService({ ...editingService, careTipEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    {L("Post-Care Advice (Bengali)", "চিকিৎসা পরবর্তী যত্ন (বাংলা)")}
                  </label>
                  <textarea
                    rows={2}
                    value={editingService.careTipBn}
                    onChange={(e) =>
                      setEditingService({ ...editingService, careTipBn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Active Toggle in Modal */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="modalActive"
                  checked={editingService.isActive}
                  onChange={(e) =>
                    setEditingService({ ...editingService, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-teal-500 bg-[#090f1d] border-slate-700 cursor-pointer"
                />
                <label htmlFor="modalActive" className="text-xs font-bold text-slate-200 cursor-pointer">
                  {L("Visible on Public Website", "ওয়েবসাইটে এই সেবা সক্রিয় রাখুন")}
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
                >
                  {L("Cancel", "বাতিল")}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-black text-xs shadow-md shadow-teal-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <i className={`ph-bold ${saving ? "ph-spinner animate-spin" : "ph-check"} text-sm`} />
                  <span>{saving ? L("Saving...", "সংরক্ষণ হচ্ছে...") : L("Save Changes", "পরিবর্তন সংরক্ষণ করুন")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

