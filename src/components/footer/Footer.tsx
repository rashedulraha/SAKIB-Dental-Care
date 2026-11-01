"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useClinic } from "@/context/ClinicContext";
import { Container } from "@/components/common/Container";

export const Footer: React.FC = () => {
  const { t, currentLang } = useLanguage();
  const {
    whatsappNumber,
    whatsappLink,
    nawhataName,
    nawhataAddress,
    nawhataHours,
    cityName,
    cityAddress,
    cityHours,
  } = useClinic();

  return (
    <footer
      id="footer-contact"
      className="mt-20 border-t border-white/40 dark:border-white/10 apple-glass-subtle pt-12 pb-28 md:pb-12"
    >
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200/60 dark:border-white/10">
        {/* Brand Info (4 Cols) */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
              <i className="ph-fill ph-tooth text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {t("footerBrandTitle")}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                সাকিব ডেন্টাল কেয়ার • Rajshahi
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("footerDesc")}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
            >
              <i className="ph-fill ph-whatsapp-logo text-base" /> {whatsappNumber}
            </a>
          </div>
        </div>

        {/* Nowhata Branch (4 Cols) */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {nawhataName || t("footerB1Title")}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            {nawhataAddress}
          </p>
          <p className="text-xs font-bold text-sky-600 dark:text-sky-400 pt-1">
            <i className="ph-fill ph-clock text-xs mr-1" />
            {nawhataHours}
          </p>
        </div>

        {/* City Branch (4 Cols) */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {cityName || t("footerB2Title")}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            {cityAddress}
          </p>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 pt-1">
            <i className="ph-fill ph-clock text-xs mr-1" />
            {cityHours}
          </p>
        </div>
      </Container>

      <Container className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <p>{t("footerCopyright")}</p>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a
            href="/admin"
            className="hover:text-sky-500 transition-colors flex items-center gap-1 font-semibold"
            title="Clinic Admin Dashboard"
          >
            <i className="ph-bold ph-lock-key text-xs" />
            <span>অ্যাডমিন</span>
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            {currentLang === "bn" ? "ডিজাইন ও ডেভেলপমেন্টে:" : "Designed & Developed by"}
          </span>
          <a
            href="https://exzazon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-slate-800 dark:text-white px-3 py-1 rounded-full bg-slate-200/70 dark:bg-white/10 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 transition-all shadow-sm group"
          >
            <i className="ph-fill ph-sparkle text-sky-500 group-hover:text-white transition-colors" />
            <span>Exzazon</span>
            <i className="ph-bold ph-arrow-up-right text-[10px] text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </Container>
    </footer>
  );
};
