"use client";

import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLocationsPage() {
  const { L } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    // Central Contact Numbers
    primaryHotline: "01733-054717",
    whatsappNumber: "01733-054717",

    // Nowhata Branch Location & Schedule
    nawhataNameEn: "Nowhata Branch (Nowhata Bazar)",
    nawhataNameBn: "নওহাটা শাখা (নওহাটা বাজার)",
    nawhataAddressEn: "East of Akbari Mosque (Mondol Market Ground Floor), Nowhata Bazar, Paba, Rajshahi",
    nawhataAddressBn: "আকবরী মসজিদের পূর্বে (মন্ডল মার্কেটের নীচ তলা), নওহাটা বাজার, পবা, রাজশাহী",
    nawhataHoursEn: "9:00 AM – 9:00 PM (Friday Closed)",
    nawhataHoursBn: "সকাল ৯:০০ টা – রাত ৯:০০ টা (শুক্রবার বন্ধ)",
    nawhataFridayClosed: true,
    nawhataMapUrl: "https://maps.google.com/?q=Nowhata+Bazar+Rajshahi",

    // City Branch (Sopura) Location & Schedule
    cityNameEn: "City Branch (Sopura, Rajshahi)",
    cityNameBn: "শহর শাখা (সপুরা, রাজশাহী)",
    cityAddressEn: "Kasaikhana More, Jinnahnagar, Sopura, Rajshahi",
    cityAddressBn: "কসাইখানা মোড়, জিন্নাহনগর, সপুরা, রাজশাহী",
    cityHoursEn: "5:00 PM – 10:00 PM (Friday Closed)",
    cityHoursBn: "বিকাল ৫:০০ টা – রাত ১০:০০ টা (শুক্রবার বন্ধ)",
    cityMapUrl: "https://maps.google.com/?q=Sopura+Rajshahi",
  });

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/settings");
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          setForm((prev) => ({
            ...prev,
            ...json.data,
          }));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: string, val: any) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      // First fetch current entire config to preserve emergency notices
      const curRes = await fetch("/api/admin/settings");
      const curJson = await curRes.json();
      const baseConfig = curJson.data || {};

      const mergedConfig = {
        ...baseConfig,
        ...form,
      };

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mergedConfig),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Save locations & contacts error:", err);
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
            {L("Chambers & Contacts", "চেম্বার ও যোগাযোগ তথ্য")}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {L("Contacts, Addresses & Chamber Timings", "যোগাযোগ নম্বর, ঠিকানা ও চেম্বার সময়সূচী")}
          </h1>
          <p className="text-xs text-slate-400">
            {L(
              "Update clinic contact numbers, WhatsApp hotline, and chamber addresses. Changes sync live across the entire website.",
              "ওয়েবসাইটের সকল কল বাটন, বুকিং ফর্ম, হেডার, ফুটার এবং উভয় চেম্বারের ঠিকানা এখান থেকেই নিয়ন্ত্রণ করুন। পরিবর্তন করলেই সাথে সাথে আপডেট হবে।"
            )}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce shrink-0">
            <i className="ph-bold ph-check-circle text-base text-emerald-400" />
            <span>{L("Information Saved Successfully!", "তথ্য সফলভাবে সংরক্ষিত হয়েছে!")}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="bg-[#0f172a] rounded-3xl p-12 border border-slate-800 text-center space-y-3">
          <i className="ph-bold ph-spinner animate-spin text-3xl text-sky-400" />
          <p className="text-sm text-slate-300 font-medium">
            {L("Loading contact and branch information...", "তথ্য লোড হচ্ছে...")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Central Contact Numbers & Hotlines */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center justify-center text-xl">
                  <i className="ph-fill ph-phone-call" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    {L("Central Contact & Helpline Numbers", "সেন্ট্রাল হটলাইন ও যোগাযোগ নম্বর")}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {L(
                      "Changes here immediately update the website Header, Footer, Booking pass, and Floating WhatsApp chat.",
                      "এখানে নম্বর পরিবর্তন করলে ওয়েবসাইটের হেডার, ফুটার, সিরিয়াল স্লিপ এবং ফ্লোটিং বাটনে তাৎক্ষণিক পরিবর্তন হবে।"
                    )}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Sync Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* WhatsApp Number */}
              <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2">
                  <i className="ph-fill ph-whatsapp-logo text-emerald-400 text-lg" />
                  <label className="text-xs font-bold text-slate-200">
                    {L("WhatsApp Serial Booking Number", "হোয়াটসঅ্যাপ সিরিয়াল নম্বর")}
                  </label>
                </div>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                  placeholder="01733-054717"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060a14] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
                <p className="text-[11px] text-slate-400">
                  {L("Used by booking forms and floating chat widget.", "অনলাইন সিরিয়াল বুকিং ও ফ্লোটিং চ্যাটে ব্যবহৃত")}
                </p>
              </div>

              {/* Calling Hotline */}
              <div className="p-4 rounded-2xl bg-[#090f1d] border border-slate-700/80 space-y-2">
                <div className="flex items-center gap-2">
                  <i className="ph-fill ph-phone text-sky-400 text-lg" />
                  <label className="text-xs font-bold text-slate-200">
                    {L("Calling Serial Hotline", "সরাসরি কল করার হটলাইন নম্বর")}
                  </label>
                </div>
                <input
                  type="text"
                  value={form.primaryHotline}
                  onChange={(e) => handleChange("primaryHotline", e.target.value)}
                  placeholder="01733-054717"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060a14] border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                  required
                />
                <p className="text-[11px] text-slate-400">
                  {L("Dialed when patients click the call buttons.", "রোগীরা সরাসরি কল বাটনে চাপ দিলে ডায়াল হবে")}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Nowhata Branch Card */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center justify-center text-xl">
                  <i className="ph-fill ph-sun" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    {L("1. Nowhata Bazar Branch (Day Shift)", "১. নওহাটা বাজার শাখা (দিন শিফট)")}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {L("Primary daytime chamber serving Paba and surrounding areas.", "নওহাটা বাজারের প্রধান দিবা শাখা।")}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Day Chamber</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch Name EN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Branch Name (English)", "শাখার নাম (ইংরেজি)")}
                </label>
                <input
                  type="text"
                  value={form.nawhataNameEn}
                  onChange={(e) => handleChange("nawhataNameEn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Branch Name BN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Branch Name (Bengali)", "শাখার নাম (বাংলা)")}
                </label>
                <input
                  type="text"
                  value={form.nawhataNameBn}
                  onChange={(e) => handleChange("nawhataNameBn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Address EN */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">
                  {L("Full Address (English)", "পূর্ণ ঠিকানা (ইংরেজি)")}
                </label>
                <textarea
                  rows={2}
                  value={form.nawhataAddressEn}
                  onChange={(e) => handleChange("nawhataAddressEn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Address BN */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">
                  {L("Full Address (Bengali)", "পূর্ণ ঠিকানা (বাংলা)")}
                </label>
                <textarea
                  rows={2}
                  value={form.nawhataAddressBn}
                  onChange={(e) => handleChange("nawhataAddressBn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Visiting Hours EN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Visiting Hours (English)", "রোগী দেখার সময় (ইংরেজি)")}
                </label>
                <input
                  type="text"
                  value={form.nawhataHoursEn}
                  onChange={(e) => handleChange("nawhataHoursEn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Visiting Hours BN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Visiting Hours (Bengali)", "রোগী দেখার সময় (বাংলা)")}
                </label>
                <input
                  type="text"
                  value={form.nawhataHoursBn}
                  onChange={(e) => handleChange("nawhataHoursBn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Google Maps Link */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">
                  {L("Google Maps Location Link", "গুগল ম্যাপ লোকেশন লিংক")}
                </label>
                <input
                  type="text"
                  value={form.nawhataMapUrl}
                  onChange={(e) => handleChange("nawhataMapUrl", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Friday Closed Toggle */}
              <div className="md:col-span-2 flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="fridayClosed"
                  checked={form.nawhataFridayClosed}
                  onChange={(e) => handleChange("nawhataFridayClosed", e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 bg-[#090f1d] border-slate-700 cursor-pointer"
                />
                <label htmlFor="fridayClosed" className="text-xs font-bold text-slate-200 cursor-pointer">
                  {L(
                    "Friday Closed (Show Friday Closed badge for Nowhata)",
                    "শুক্রবার নওহাটা শাখা বন্ধ রাখুন (শুক্রবার বন্ধ ব্যাজ সক্রিয়)"
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Card 3: Rajshahi City Branch Card */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xl">
                  <i className="ph-fill ph-moon-stars" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    {L("2. Rajshahi City Branch, Sopura (Evening Shift)", "২. রাজশাহী শহর শাখা, সপুরা (ইভিনিং শিফট)")}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {L("Evening chamber located in Sopura, Rajshahi city.", "রাজশাহী শহরের সপুরায় সান্ধ্যকালীন চেম্বার।")}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Evening Chamber</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch Name EN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Branch Name (English)", "শাখার নাম (ইংরেজি)")}
                </label>
                <input
                  type="text"
                  value={form.cityNameEn}
                  onChange={(e) => handleChange("cityNameEn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Branch Name BN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Branch Name (Bengali)", "শাখার নাম (বাংলা)")}
                </label>
                <input
                  type="text"
                  value={form.cityNameBn}
                  onChange={(e) => handleChange("cityNameBn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Address EN */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">
                  {L("Full Address (English)", "পূর্ণ ঠিকানা (ইংরেজি)")}
                </label>
                <textarea
                  rows={2}
                  value={form.cityAddressEn}
                  onChange={(e) => handleChange("cityAddressEn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Address BN */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">
                  {L("Full Address (Bengali)", "পূর্ণ ঠিকানা (বাংলা)")}
                </label>
                <textarea
                  rows={2}
                  value={form.cityAddressBn}
                  onChange={(e) => handleChange("cityAddressBn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Visiting Hours EN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Visiting Hours (English)", "রোগী দেখার সময় (ইংরেজি)")}
                </label>
                <input
                  type="text"
                  value={form.cityHoursEn}
                  onChange={(e) => handleChange("cityHoursEn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Visiting Hours BN */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {L("Visiting Hours (Bengali)", "রোগী দেখার সময় (বাংলা)")}
                </label>
                <input
                  type="text"
                  value={form.cityHoursBn}
                  onChange={(e) => handleChange("cityHoursBn", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              {/* Google Maps Link */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-300">
                  {L("Google Maps Location Link", "গুগল ম্যাপ লোকেশন লিংক")}
                </label>
                <input
                  type="text"
                  value={form.cityMapUrl}
                  onChange={(e) => handleChange("cityMapUrl", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090f1d] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
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
                  : L("Save Changes", "পরিবর্তন সংরক্ষণ করুন")}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
