"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { dentalServices } from "@/data/services";
import { ServiceCategory } from "@/types";
import { toBanglaDigits } from "@/data/translations";

export const ServicesSection: React.FC = () => {
  const { currentLang, t, openServiceModal, preselectServiceById } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const colorMap = {
    sky: "from-sky-500/20 to-sky-600/5 text-sky-600 dark:text-sky-400 border-sky-500/30",
    indigo: "from-indigo-500/20 to-indigo-600/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    teal: "from-teal-500/20 to-teal-600/5 text-teal-600 dark:text-teal-400 border-teal-500/30",
    rose: "from-rose-500/20 to-rose-600/5 text-rose-600 dark:text-rose-400 border-rose-500/30",
    amber: "from-amber-500/20 to-amber-600/5 text-amber-600 dark:text-amber-400 border-amber-500/30",
    emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  };

  const filteredServices = dentalServices.filter((s) => {
    const matchesCategory = activeFilter === "all" || s.category === activeFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.titleEn.toLowerCase().includes(q) ||
      s.titleBn.toLowerCase().includes(q) ||
      s.shortDescEn.toLowerCase().includes(q) ||
      s.shortDescBn.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const categories: { key: ServiceCategory; labelKey: string }[] = [
    { key: "all", labelKey: "filterAll" },
    { key: "restorative", labelKey: "filterRestorative" },
    { key: "cosmetic", labelKey: "filterCosmetic" },
    { key: "ortho-surgical", labelKey: "filterOrtho" },
    { key: "diagnostic", labelKey: "filterDiagnostic" },
  ];

  return (
    <section id="services" className="scroll-mt-24 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <i className="ph-fill ph-first-aid-kit" />
            <span>{t("servicesTag")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t("servicesTitle")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl">
            {t("servicesSub")}
          </p>
        </div>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <i className="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                currentLang === "bn"
                  ? "চিকিৎসা খুঁজুন (যেমন: রুট ক্যানাল, এক্স-রে)..."
                  : "Search treatment (e.g. Root Canal, X-Ray)..."
              }
              className="apple-input pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-nowrap sm:flex-wrap gap-1.5 apple-glass-subtle p-1.5 rounded-2xl w-fit max-w-full overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveFilter(cat.key)}
            className={`service-filter-btn px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              activeFilter === cat.key
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/10"
            }`}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* 10 Glassmorphism Service Cards Grid */}
      <div id="servicesGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full apple-glass rounded-3xl p-8 text-center space-y-2">
            <i className="ph-duotone ph-magnifying-glass text-3xl text-sky-500" />
            <p className="font-bold text-slate-800 dark:text-white">
              {currentLang === "bn" ? "কোনো চিকিৎসা পাওয়া যায়নি" : "No matching treatment found"}
            </p>
          </div>
        ) : (
          filteredServices.map((service) => {
            const badgeText =
              currentLang === "bn"
                ? `সেবা নং ${service.id < 10 ? "০" + toBanglaDigits(service.id) : "১০"}`
                : `Service #${service.id < 10 ? "0" + service.id : service.id}`;

            const durationText = currentLang === "bn" ? service.durationBn : service.durationEn;
            const bookBtnText = currentLang === "bn" ? "সিরিয়াল নিন" : "Book Now";

            return (
              <div
                key={service.id}
                onClick={() => openServiceModal(service.id)}
                className="apple-glass apple-glass-interactive glass-sheen rounded-[28px] p-6 flex flex-col justify-between space-y-5 cursor-pointer group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                        colorMap[service.color]
                      } border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                    >
                      <i className={`ph-duotone ${service.icon}`} />
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full apple-glass-subtle text-slate-500 dark:text-slate-400">
                      {badgeText}
                    </span>
                  </div>

                  <div>
                    {currentLang === "en" ? (
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                        {service.titleEn}
                      </h3>
                    ) : currentLang === "bn" ? (
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                        {service.titleBn}
                      </h3>
                    ) : (
                      <>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                          {service.titleEn}
                        </h3>
                        <p className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                          {service.titleBn}
                        </p>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentLang === "en" ? (
                      service.shortDescEn
                    ) : currentLang === "bn" ? (
                      service.shortDescBn
                    ) : (
                      <>
                        {service.shortDescEn}
                        <span className="block mt-1 text-xs opacity-85">
                          {service.shortDescBn}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <i className="ph-fill ph-clock text-sky-500" /> {durationText}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      preselectServiceById(service.id);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-700 dark:text-sky-300 hover:text-white text-xs font-bold transition-colors"
                  >
                    {bookBtnText}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
