"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const MobileDock: React.FC = () => {
  const { t, cycleMobileLanguage, currentLang } = useLanguage();

  const langLabel = currentLang === "en" ? "বাংলা" : currentLang === "bn" ? "EN/বাং" : "English";

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 flex justify-center pointer-events-none md:hidden">
      <div className="apple-glass-strong rounded-full px-3 py-2 flex items-center gap-2 shadow-2xl pointer-events-auto border border-white/60 dark:border-white/15">
        <a
          href="#branches"
          className="flex flex-col items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-200"
        >
          <i className="ph-fill ph-map-pin text-lg text-sky-500" />
          <span>{t("mobBranches")}</span>
        </a>
        <a
          href="#services"
          className="flex flex-col items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-200"
        >
          <i className="ph-fill ph-tooth text-lg text-teal-500" />
          <span>{t("mobServices")}</span>
        </a>
        <a
          href="#booking"
          className="flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-lg"
        >
          <i className="ph-bold ph-calendar-plus text-base" />
          <span>{t("mobBook")}</span>
        </a>
        <button
          type="button"
          onClick={cycleMobileLanguage}
          className="flex flex-col items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-400"
        >
          <i className="ph-bold ph-translate text-lg" />
          <span id="mobLangLabel">{langLabel}</span>
        </button>
        <a
          href="tel:+8801733054717"
          className="flex flex-col items-center px-2.5 py-1 rounded-full text-[11px] font-bold text-rose-600 dark:text-rose-400"
        >
          <i className="ph-fill ph-phone-call text-lg" />
          <span>{t("mobCall")}</span>
        </a>
      </div>
    </div>
  );
};
