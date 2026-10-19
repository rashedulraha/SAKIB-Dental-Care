"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { symptomData } from "@/data/symptoms";

export const SymptomGuideSection: React.FC = () => {
  const { currentLang, t, preselectServiceById } = useLanguage();
  const [activeSymptomId, setActiveSymptomId] = useState<string>("pain");

  const current = symptomData.find((s) => s.id === activeSymptomId) || symptomData[0];

  const recTitle =
    currentLang === "bn"
      ? current.recBn
      : currentLang === "en"
      ? current.recEn
      : `${current.recEn} • ${current.recBn}`;

  const causeText = currentLang === "bn" ? current.causeBn : current.causeEn;
  const stepsList = currentLang === "bn" ? current.stepsBn : current.stepsEn;
  const secText = currentLang === "bn" ? current.secBn : current.secEn;

  return (
    <section id="symptom-guide" className="scroll-mt-24">
      <div className="apple-glass-strong rounded-[36px] p-6 sm:p-10 space-y-8 relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full">
            <i className="ph-fill ph-sparkle" />
            <span>{t("symptomTag")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t("symptomTitle")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t("symptomSub")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Symptom Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-2.5" id="symptomButtonsContainer">
            {symptomData.map((item) => {
              const isActive = item.id === activeSymptomId;
              const label =
                currentLang === "bn"
                  ? item.symptomBn
                  : currentLang === "en"
                  ? item.symptomEn
                  : `${item.symptomEn} (${item.symptomBn})`;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSymptomId(item.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                    isActive
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 scale-[1.01]"
                      : "apple-glass-subtle hover:bg-white/60 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                      } flex items-center justify-center text-lg shrink-0`}
                    >
                      <i className={`ph-fill ${item.icon}`} />
                    </div>
                    <span className="font-bold text-xs sm:text-sm">{label}</span>
                  </div>
                  <i
                    className={`ph-bold ph-caret-right ${isActive ? "text-white" : "text-slate-400"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Recommended Treatment Glass Display */}
          <div
            id="symptomResultCard"
            className="lg:col-span-7 apple-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border-2 border-sky-500/30"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 text-xs font-bold">
                  {currentLang === "bn"
                    ? "প্রস্তাবিত সমাধান • সাকিব ডেন্টাল কেয়ার"
                    : "Recommended Clinical Solution • Sakib Dental Care"}
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <i className="ph-fill ph-shield-check" />{" "}
                  {currentLang === "bn" ? "১০০% জীবাণুমুক্ত ও ব্যথামুক্ত" : "100% Sterile & Painless"}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {recTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  <strong>
                    {currentLang === "bn" ? "সম্ভাব্য কারণ:" : "Clinical Cause:"}
                  </strong>{" "}
                  {causeText}
                </p>
              </div>

              <div className="apple-glass-subtle rounded-2xl p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {currentLang === "bn"
                    ? "কীভাবে চিকিৎসা করা হবে:"
                    : "How We Treat This at Sakib Dental Care:"}
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {stepsList.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="ph-fill ph-check-circle text-emerald-500 text-base shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {currentLang === "bn" ? "সহায়ক সেবা:" : "Supporting Care:"}{" "}
                <strong className="text-slate-700 dark:text-slate-200">{secText}</strong>
              </div>
              <button
                type="button"
                onClick={() => preselectServiceById(current.serviceId)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-3 rounded-xl shadow-md transition-all text-xs sm:text-sm"
              >
                <i className="ph-bold ph-calendar-plus" />
                <span>
                  {currentLang === "bn" ? "এই চিকিৎসার সিরিয়াল নিন" : "Book This Treatment"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
