"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const SpecialistHighlight: React.FC = () => {
  const { t, quickSelectBranch } = useLanguage();

  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Overview Banner */}
        <div className="lg:col-span-5 apple-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 border-l-4 border-l-rose-500">
          <div className="space-y-2">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-rose-500 text-white rounded-full inline-block">
              {t("heroXrayPill")}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {t("heroXrayTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {t("heroXraySub")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5 xs:gap-2 pt-2">
            <div className="apple-glass-subtle rounded-xl p-2 xs:p-2.5 text-center">
              <p className="text-xs xs:text-sm sm:text-base font-extrabold text-sky-600 dark:text-sky-400">
                {t("stat1Val")}
              </p>
              <p className="text-[10px] xs:text-[11px] text-slate-600 dark:text-slate-300">{t("stat1Label")}</p>
            </div>
            <div className="apple-glass-subtle rounded-xl p-2 xs:p-2.5 text-center">
              <p className="text-xs xs:text-sm sm:text-base font-extrabold text-teal-600 dark:text-teal-400">
                {t("stat2Val")}
              </p>
              <p className="text-[10px] xs:text-[11px] text-slate-600 dark:text-slate-300">{t("stat2Label")}</p>
            </div>
            <div className="apple-glass-subtle rounded-xl p-2 xs:p-2.5 text-center">
              <p className="text-xs xs:text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                {t("stat3Val")}
              </p>
              <p className="text-[10px] xs:text-[11px] text-slate-600 dark:text-slate-300">{t("stat3Label")}</p>
            </div>
          </div>
        </div>

        {/* Right Dual Chamber Status Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Branch 1 Glass Card: Nowhata Branch */}
          <div
            id="heroCardNawhata"
            className="apple-glass rounded-2xl sm:rounded-3xl p-4 xs:p-5 transition-all duration-300 border-t-4 border-t-sky-500 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full">
                  <i className="ph-fill ph-sun-horizon" />
                  <span>{t("b1ShiftBadge")}</span>
                </span>
                <span
                  id="badgeNawhata"
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                >
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {t("b1TitleShort")}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-1.5">
                <i className="ph-fill ph-map-pin text-rose-500 text-sm shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t("b1AddressHero") }} />
              </p>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/50 dark:border-white/10">
              <span className="font-semibold text-sky-700 dark:text-sky-300">
                {t("b1HoursHero")}
              </span>
              <button
                type="button"
                onClick={() => quickSelectBranch("nawhata")}
                className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>{t("bookNowLink")}</span>
                <i className="ph-bold ph-caret-right" />
              </button>
            </div>
          </div>

          {/* Branch 2 Glass Card: City Branch */}
          <div
            id="heroCardCity"
            className="apple-glass rounded-2xl sm:rounded-3xl p-4 xs:p-5 transition-all duration-300 border-t-4 border-t-indigo-500 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 px-2.5 py-0.5 rounded-full">
                  <i className="ph-fill ph-moon-stars" />
                  <span>{t("b2ShiftBadge")}</span>
                </span>
                <span
                  id="badgeCity"
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                >
                  7:00 PM - 11:00 PM
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {t("b2TitleShort")}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-1.5">
                <i className="ph-fill ph-map-pin text-indigo-500 text-sm shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: t("b2AddressHero") }} />
              </p>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/50 dark:border-white/10">
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                {t("b2HoursHero")}
              </span>
              <button
                type="button"
                onClick={() => quickSelectBranch("city")}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>{t("bookNowLink")}</span>
                <i className="ph-bold ph-caret-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
