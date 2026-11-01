"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useClinic } from "@/context/ClinicContext";

export const BranchesSection: React.FC = () => {
  const { t, currentLang, quickSelectBranch } = useLanguage();
  const {
    nawhataName,
    nawhataAddress,
    nawhataHours,
    nawhataMapUrl,
    cityName,
    cityAddress,
    cityHours,
    cityMapUrl,
  } = useClinic();

  // Real-time branch open/close status
  const now = new Date();
  const hour = now.getHours();
  const isFriday = now.getDay() === 5;
  const isBn = currentLang === "bn";

  const nawhataOpen = !isFriday && hour >= 9 && hour < 21;
  const cityOpen = !isFriday && hour >= 17 && hour < 22;

  return (
    <section id="branches" className="scroll-mt-24 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          <i className="ph-fill ph-buildings" />
          <span>{t("branchesSectionTag")}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t("branchesSectionTitle")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          {t("branchesSectionSub")}
        </p>
      </div>

      {/* Two Large Apple Glass Branch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branch 1: Nowhata Branch */}
        <div className="apple-glass apple-glass-interactive glass-sheen rounded-2xl sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-500/30">
                <i className="ph-fill ph-sun text-base" />
                <span>{t("b1CardPill")}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <span
                  className={`w-2 h-2 rounded-full ${
                    nawhataOpen ? "bg-emerald-500 animate-ping" : "bg-sky-500"
                  }`}
                />
                {nawhataOpen
                  ? (isBn ? "এখন খোলা (সকাল ৯:০০ – রাত ৯:০০)" : "Open Now (9:00 AM – 9:00 PM)")
                  : (isBn ? "সকাল ৯:০০ – রাত ৯:০০ (শুক্রবার বন্ধ)" : "9:00 AM – 9:00 PM (Friday Closed)")}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {nawhataName || t("b1CardHeading")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t("b1CardSub")}
              </p>
            </div>

            {/* Address & Schedule Details Glass Box */}
            <div className="space-y-3 apple-glass-subtle rounded-2xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="ph-fill ph-map-pin-line text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("locationLabel")}
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {nawhataAddress}
                  </p>
                </div>
              </div>

              <hr className="border-slate-200/60 dark:border-white/10" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="ph-fill ph-clock-afternoon text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("visitingHoursLabel")}
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-sky-700 dark:text-sky-300">
                    {nawhataHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => quickSelectBranch("nawhata")}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-sky-500/25 transition-all text-sm sm:text-base"
            >
              <i className="ph-bold ph-calendar-plus" />
              <span>{t("b1BookCta")}</span>
            </button>
            <a
              href={nawhataMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-glass-subtle hover:bg-white/70 dark:hover:bg-white/15 font-semibold py-3.5 px-4 rounded-2xl inline-flex items-center justify-center gap-2 text-sm transition-all"
            >
              <i className="ph-fill ph-navigation-arrow text-sky-500" />
              <span>{t("openMapBtn")}</span>
            </a>
          </div>
        </div>

        {/* Branch 2: City Branch */}
        <div className="apple-glass apple-glass-interactive glass-sheen rounded-2xl sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-500/30">
                <i className="ph-fill ph-moon-stars text-base" />
                <span>{t("b2CardPill")}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                <span
                  className={`w-2 h-2 rounded-full ${
                    cityOpen ? "bg-emerald-400 animate-ping" : "bg-indigo-500"
                  }`}
                />
                {cityOpen
                  ? (isBn ? "এখন খোলা (বিকাল ৫:০০ – রাত ১০:০০)" : "Open Now (5:00 PM – 10:00 PM)")
                  : (isBn ? "বিকাল ৫:০০ – রাত ১০:০০ (শুক্রবার বন্ধ)" : "5:00 PM – 10:00 PM (Friday Closed)")}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {cityName || t("b2CardHeading")}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t("b2CardSub")}
              </p>
            </div>

            {/* Address & Schedule Details Glass Box */}
            <div className="space-y-3 apple-glass-subtle rounded-2xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="ph-fill ph-map-pin-line text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("locationLabel")}
                  </p>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {cityAddress}
                  </p>
                </div>
              </div>

              <hr className="border-slate-200/60 dark:border-white/10" />

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="ph-fill ph-clock-countdown text-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("visitingHoursLabel")}
                  </p>
                  <p className="text-base sm:text-lg font-extrabold text-indigo-700 dark:text-indigo-300">
                    {cityHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => quickSelectBranch("city")}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all text-sm sm:text-base"
            >
              <i className="ph-bold ph-calendar-plus" />
              <span>{t("b2BookCta")}</span>
            </button>
            <a
              href={cityMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-glass-subtle hover:bg-white/70 dark:hover:bg-white/15 font-semibold py-3.5 px-4 rounded-2xl inline-flex items-center justify-center gap-2 text-sm transition-all"
            >
              <i className="ph-fill ph-navigation-arrow text-indigo-500" />
              <span>{t("openMapBtn")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
