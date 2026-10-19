"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const BranchesSection: React.FC = () => {
  const { t, quickSelectBranch } = useLanguage();
  const [simulatedTime, setSimulatedTime] = useState<"real" | 11 | 20>("real");

  // Determine branch status based on simulation or real time
  const now = new Date();
  const hour = simulatedTime === "real" ? now.getHours() : simulatedTime;
  const isFriday = simulatedTime === "real" ? now.getDay() === 5 : false;

  const nawhataOpen = !isFriday && hour >= 9 && hour < 18;
  const cityOpen = hour >= 19 && hour < 23;

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

      {/* Interactive Time Simulator Bar */}
      <div className="max-w-xl mx-auto apple-glass-subtle rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
          <i className="ph-fill ph-sliders text-sky-500 text-base" />
          <span>{t("simLabel")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSimulatedTime("real")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              simulatedTime === "real"
                ? "bg-sky-500 text-white"
                : "hover:bg-white/50 dark:hover:bg-white/10"
            }`}
          >
            {t("simLiveBtn")}
          </button>
          <button
            type="button"
            onClick={() => setSimulatedTime(11)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              simulatedTime === 11
                ? "bg-sky-500 text-white"
                : "hover:bg-white/50 dark:hover:bg-white/10"
            }`}
          >
            {t("simMorningBtn")}
          </button>
          <button
            type="button"
            onClick={() => setSimulatedTime(20)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              simulatedTime === 20
                ? "bg-indigo-500 text-white"
                : "hover:bg-white/50 dark:hover:bg-white/10"
            }`}
          >
            {t("simNightBtn")}
          </button>
        </div>
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
                {nawhataOpen ? "Open Now (9:00 AM – 6:00 PM)" : "9:00 AM – 6:00 PM"}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t("b1CardHeading")}
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
                    {t("b1LocationMain")}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1"
                    dangerouslySetInnerHTML={{ __html: t("b1LocationFull") }}
                  />
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
                    {t("b1VisitingHoursMain")}
                  </p>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                    {t("b1FridayNote")}
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
              href="https://www.google.com/maps/search/?api=1&query=Nowhata+Bazar+Akbari+Mosque+Paba+Rajshahi"
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
                {cityOpen ? "Open Now (7:00 PM – 11:00 PM)" : "7:00 PM – 11:00 PM"}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {t("b2CardHeading")}
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
                    {t("b2LocationMain")}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1"
                    dangerouslySetInnerHTML={{ __html: t("b2LocationFull") }}
                  />
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
                    {t("b2VisitingHoursMain")}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    {t("b2EveningNote")}
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
              href="https://www.google.com/maps/search/?api=1&query=Jinnahnagar+Sopura+Rajshahi"
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
