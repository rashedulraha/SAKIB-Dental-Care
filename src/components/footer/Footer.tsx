"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/common/Container";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

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
              href="https://wa.me/8801733054717"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-emerald-500 hover:text-white transition-all"
            >
              <i className="ph-fill ph-whatsapp-logo text-base" /> 01733-054717
            </a>
            <a
              href="tel:+8801688434676"
              className="px-3.5 py-2 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-300 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-sky-500 hover:text-white transition-all"
            >
              <i className="ph-fill ph-phone-call text-base" /> 01688-434676
            </a>
          </div>
        </div>

        {/* Nowhata Branch (4 Cols) */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {t("footerB1Title")}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
            {t("footerB1AddrShort")}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("footerB1AddrFull")}
          </p>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t("footerB1Hours")}
          </p>
        </div>

        {/* City Branch (4 Cols) */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t("footerB2Title")}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
            {t("footerB2AddrShort")}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t("footerB2AddrFull")}
          </p>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {t("footerB2Hours")}
          </p>
        </div>
      </Container>

      <Container className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>{t("footerCopyright")}</p>
        <p className="flex items-center gap-1.5">
          <i className="ph-fill ph-sparkle text-sky-500" /> Apple VisionOS Glassmorphism UI •
          English &amp; বাংলা
        </p>
      </Container>
    </footer>
  );
};
