"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export default function AdminSettingsPage() {
  const { L } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    primaryHotline: "01733-054717",
    whatsappNumber: "01733-054717",
    facebookUrl: "https://facebook.com/sakibdentalcare",
    facebookUsername: "sakibdentalcare",
    youtubeUrl: "https://youtube.com/@sakibdentalcare",
    youtubeUsername: "@sakibdentalcare",
  });

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          setForm({
            primaryHotline: json.data.primaryHotline || "01733-054717",
            whatsappNumber: json.data.whatsappNumber || "01733-054717",
            facebookUrl: json.data.facebookUrl ?? "https://facebook.com/sakibdentalcare",
            facebookUsername: json.data.facebookUsername ?? "sakibdentalcare",
            youtubeUrl: json.data.youtubeUrl ?? "https://youtube.com/@sakibdentalcare",
            youtubeUsername: json.data.youtubeUsername ?? "@sakibdentalcare",
          });
        }
      } catch (err) {
        console.error("Failed to load hotline settings:", err);
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
      // First fetch current entire config to preserve locations & notices
      const curRes = await fetch("/api/admin/settings");
      const curJson = await curRes.json();
      const baseConfig = curJson.data || {};

      const merged = {
        ...baseConfig,
        primaryHotline: form.primaryHotline,
        whatsappNumber: form.whatsappNumber,
        facebookUrl: form.facebookUrl,
        facebookUsername: form.facebookUsername,
        youtubeUrl: form.youtubeUrl,
        youtubeUsername: form.youtubeUsername,
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
      console.error("Save settings error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {L("Contact Information", "যোগাযোগ ও হটলাইন")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Hotlines & Contact Settings", "হটলাইন ও হোয়াটসঅ্যাপ সিরিয়াল নম্বর")}
          </h1>
          <p className="text-xs text-slate-400">
            {L(
              "Update the phone numbers used across the website for calls and WhatsApp serial appointments.",
              "ওয়েবসাইটের সকল কল বাটন, বুকিং ফর্ম এবং হোয়াটসঅ্যাপে ব্যবহৃত হেল্পলাইন নম্বরসমূহ আপডেট করুন।"
            )}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <i className="ph-bold ph-check-circle text-base text-emerald-400" />
            <span>{L("Contact Numbers Saved Successfully!", "যোগাযোগ নম্বর সফলভাবে সংরক্ষিত হয়েছে!")}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="bg-[#0f172a] rounded-3xl p-12 border border-slate-800 text-center space-y-3">
          <i className="ph-bold ph-spinner animate-spin text-3xl text-sky-400" />
          <p className="text-sm text-slate-300 font-medium">
            {L("Loading contact settings...", "হটলাইন তথ্য লোড হচ্ছে...")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp Number */}
              <div className="p-5 rounded-2xl bg-[#090f1d] border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl">
                    <i className="ph-fill ph-whatsapp-logo" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {L("WhatsApp Booking Number", "হোয়াটসঅ্যাপ সিরিয়াল নম্বর")}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {L("Used by patient appointment forms and chat button.", "অনলাইন সিরিয়াল ও চ্যাটের জন্য ব্যবহৃত")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {L("Phone Number with leading 0", "ফোন নম্বর (যেমন 01733-054717)")}
                  </label>
                  <input
                    type="text"
                    value={form.whatsappNumber}
                    onChange={(e) => setForm((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
                    placeholder="01733-054717"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <a
                  href={`https://wa.me/88${form.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <i className="ph-bold ph-arrow-square-out" />
                  <span>{L("Test WhatsApp Link", "হোয়াটসঅ্যাপ টেস্ট করুন")}</span>
                </a>
              </div>

              {/* Direct Calling Hotline */}
              <div className="p-5 rounded-2xl bg-[#090f1d] border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-xl">
                    <i className="ph-fill ph-phone-call" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {L("Calling Hotline Number", "সরাসরি কল করার হটলাইন নম্বর")}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {L("Dialed when patients click the call buttons.", "রোগীরা সরাসরি কল বাটনে চাপ দিলে ডায়াল হবে")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {L("Phone Number with leading 0", "ফোন নম্বর (যেমন 01733-054717)")}
                  </label>
                  <input
                    type="text"
                    value={form.primaryHotline}
                    onChange={(e) => setForm((prev) => ({ ...prev, primaryHotline: e.target.value }))}
                    placeholder="01733-054717"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <a
                  href={`tel:${form.primaryHotline}`}
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
                >
                  <i className="ph-bold ph-phone" />
                  <span>{L("Test Call Dialing", "কল টেস্ট করুন")}</span>
                </a>
              </div>
            </div>

            {/* Social Media Accounts (Facebook & YouTube) */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {L("Social Media Channels", "সোশ্যাল মিডিয়া প্রোফাইল লিংক")}
                </span>
                <h3 className="text-base font-bold text-white">
                  {L("Facebook & YouTube Links", "ফেসবুক ও ইউটিউব চ্যানেল লিংক")}
                </h3>
                <p className="text-xs text-slate-400">
                  {L(
                    "Links entered here appear in the website footer for patients to visit your social media profiles.",
                    "এখানে দেওয়া সোশ্যাল মিডিয়া লিংক ও ইউজারনেমগুলো ওয়েবসাইটের ফুটারে রোগীদের জন্য দৃশ্যমান হবে।"
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Facebook Configuration */}
                <div className="p-5 rounded-2xl bg-[#090f1d] border border-slate-700/80 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xl">
                      <i className="ph-fill ph-facebook-logo" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {L("Facebook Page / Profile", "ফেসবুক পেজ / প্রোফাইল")}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {L("Direct link to your Facebook page", "আপনার ফেসবুক পেজের লিংক")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {L("Facebook Full URL", "ফেসবুক ফুল ইউআরএল (URL)")}
                    </label>
                    <input
                      type="url"
                      value={form.facebookUrl}
                      onChange={(e) => setForm((prev) => ({ ...prev, facebookUrl: e.target.value }))}
                      placeholder="https://facebook.com/sakibdentalcare"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {L("Facebook Username / Display Name", "ফেসবুক ইউজারনেম / ডিসপ্লে নাম")}
                    </label>
                    <input
                      type="text"
                      value={form.facebookUsername}
                      onChange={(e) => setForm((prev) => ({ ...prev, facebookUsername: e.target.value }))}
                      placeholder="sakibdentalcare"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {form.facebookUrl && (
                    <a
                      href={form.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold pt-1"
                    >
                      <i className="ph-bold ph-arrow-square-out" />
                      <span>{L("Visit Facebook Page", "ফেসবুক পেজ টেস্ট করুন")}</span>
                    </a>
                  )}
                </div>

                {/* YouTube Configuration */}
                <div className="p-5 rounded-2xl bg-[#090f1d] border border-slate-700/80 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center text-xl">
                      <i className="ph-fill ph-youtube-logo" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {L("YouTube Channel", "ইউটিউব চ্যানেল")}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {L("Direct link to your YouTube video channel", "আপনার ইউটিউব চ্যানেলের লিংক")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {L("YouTube Full URL", "ইউটিউব ফুল ইউআরএল (URL)")}
                    </label>
                    <input
                      type="url"
                      value={form.youtubeUrl}
                      onChange={(e) => setForm((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                      placeholder="https://youtube.com/@sakibdentalcare"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      {L("YouTube Channel Handle / Name", "ইউটিউব হ্যান্ডেল / নাম")}
                    </label>
                    <input
                      type="text"
                      value={form.youtubeUsername}
                      onChange={(e) => setForm((prev) => ({ ...prev, youtubeUsername: e.target.value }))}
                      placeholder="@sakibdentalcare"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c1322] border border-slate-700 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {form.youtubeUrl && (
                    <a
                      href={form.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold pt-1"
                    >
                      <i className="ph-bold ph-arrow-square-out" />
                      <span>{L("Visit YouTube Channel", "ইউটিউব চ্যানেল টেস্ট করুন")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Link to Chamber Addresses */}
            <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-lg shrink-0">
                  <i className="ph-fill ph-map-pin" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {L("Chamber Addresses & Visiting Hours", "উভয় চেম্বারের ঠিকানা ও সময়সূচী")}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {L(
                      "Manage Nowhata and Sopura branch addresses, schedules & map links in one unified place.",
                      "নওহাটা ও সপুরা চেম্বারের বিস্তারিত ঠিকানা ও সময়সূচী পরিবর্তন করুন।"
                    )}
                  </p>
                </div>
              </div>

              <Link
                href="/admin/locations"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white border border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>{L("Manage Locations", "চেম্বার ম্যানেজ করুন")}</span>
                <i className="ph-bold ph-arrow-right text-xs" />
              </Link>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-sm font-bold shadow-lg shadow-sky-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              <i className={`ph-bold ${saving ? "ph-spinner animate-spin" : "ph-floppy-disk"} text-base`} />
              <span>
                {saving
                  ? L("Saving...", "সংরক্ষণ হচ্ছে...")
                  : L("Save Contact Numbers", "যোগাযোগ নম্বর সংরক্ষণ করুন")}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

