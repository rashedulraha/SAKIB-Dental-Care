"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminNoticesPage() {
  const { L } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    noticeActive: false,
    noticeTextEn: "Welcome to Sakib Dental Care. Chambers at Nowhata Bazar & Rajshahi City.",
    noticeTextBn: "সাকিব ডেন্টাল কেয়ারে স্বাগতম। নওহাটা বাজার ও রাজশাহী শহর শাখায় নিয়মিত সেবা প্রদান করা হচ্ছে।",
  });

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          setForm({
            noticeActive: Boolean(json.data.noticeActive),
            noticeTextEn: json.data.noticeTextEn || "",
            noticeTextBn: json.data.noticeTextBn || "",
          });
        }
      } catch (err) {
        console.error("Failed to load notice settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      // Fetch full settings first to preserve location and hotline data
      const curRes = await fetch("/api/admin/settings");
      const curJson = await curRes.json();
      const baseConfig = curJson.data || {};

      const merged = {
        ...baseConfig,
        noticeActive: form.noticeActive,
        noticeTextEn: form.noticeTextEn,
        noticeTextBn: form.noticeTextBn,
      };

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Save notice error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {L("Website Announcement", "জরুরি নোটিশ ব্যানার")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Emergency Notice Bar", "জরুরি নোটিশ বার")}
          </h1>
          <p className="text-xs text-slate-400">
            {L(
              "Publish announcements, holiday closures, or urgent schedule changes across the top of your website.",
              "ছুটি, জরুরি নোটিশ অথবা চেম্বার সময়সূচীর বিশেষ পরিবর্তন ওয়েবসাইটের শীর্ষে দেখানোর জন্য এই নোটিশ ব্যবহার করুন।"
            )}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <i className="ph-bold ph-check-circle text-base text-emerald-400" />
            <span>{L("Notice Saved Successfully!", "নোটিশ সফলভাবে সংরক্ষিত হয়েছে!")}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="bg-[#0f172a] rounded-3xl p-12 border border-slate-800 text-center space-y-3">
          <i className="ph-bold ph-spinner animate-spin text-3xl text-sky-400" />
          <p className="text-sm text-slate-300 font-medium">
            {L("Loading notice status...", "নোটিশ লোড হচ্ছে...")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Main Notice Settings Card */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-6">
            {/* Live Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090f1d] border border-slate-700/80">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <i className="ph-bold ph-megaphone text-amber-400 text-base" />
                  <span>{L("Display Notice Bar on Website", "ওয়েবসাইটে নোটিশ বার প্রদর্শন করুন")}</span>
                </span>
                <p className="text-xs text-slate-400">
                  {L(
                    "When active, this banner appears immediately above the website content.",
                    "সক্রিয় থাকলে এই নোটিশটি ভিজিটরদের সামনে ওয়েবসাইটের শীর্ষে ভেসে উঠবে।"
                  )}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.noticeActive}
                  onChange={(e) => setForm((prev) => ({ ...prev, noticeActive: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Bilingual Text Inputs */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{L("Notice Text (English)", "নোটিশ টেক্সট (ইংরেজি)")}</span>
                  <span className="text-[10px] text-slate-400">Displayed in English view</span>
                </label>
                <textarea
                  rows={2}
                  value={form.noticeTextEn}
                  onChange={(e) => setForm((prev) => ({ ...prev, noticeTextEn: e.target.value }))}
                  placeholder="e.g. Special clinic notice: Both chambers open this Friday..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{L("Notice Text (Bengali)", "নোটিশ টেক্সট (বাংলা)")}</span>
                  <span className="text-[10px] text-slate-400">বাংলা মোডে প্রদর্শিত হবে</span>
                </label>
                <textarea
                  rows={2}
                  value={form.noticeTextBn}
                  onChange={(e) => setForm((prev) => ({ ...prev, noticeTextBn: e.target.value }))}
                  placeholder="যেমন: বিশেষ ঘোষণা: শুক্রবার উভয় চেম্বারে বিশেষ কনসালটেশন প্রদান করা হবে..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Live Website Strip Simulation */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {L("Live Simulation Preview", "ওয়েবসাইটে যেমন দেখাবে")}
              </span>

              {form.noticeActive ? (
                <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 rounded-2xl p-4 flex items-center gap-3 text-amber-200">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 animate-pulse">
                    <i className="ph-fill ph-bell-ringing text-lg" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold space-y-0.5">
                    <p>{form.noticeTextEn || "No English text provided"}</p>
                    <p className="text-amber-300/80">{form.noticeTextBn || "বাংলা টেক্সট দেওয়া হয়নি"}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#090f1d] border border-slate-800 rounded-2xl p-4 text-center text-slate-400 text-xs">
                  <i className="ph-bold ph-eye-slash text-lg mb-1 block" />
                  <span>{L("Notice is currently OFF. The banner will remain hidden on the website.", "নোটিশ বর্তমানে বন্ধ রয়েছে। ওয়েবসাইটে কোনো ব্যানার প্রদর্শিত হবে না।")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-sm font-black shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              <i className={`ph-bold ${saving ? "ph-spinner animate-spin" : "ph-floppy-disk"} text-base`} />
              <span>
                {saving
                  ? L("Saving...", "সংরক্ষণ হচ্ছে...")
                  : L("Save Notice", "নোটিশ সংরক্ষণ করুন")}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

