"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { dentalServices } from "@/data/services";

export const ServiceModal: React.FC = () => {
  const { modalServiceId, closeServiceModal, preselectServiceById, currentLang, t } = useLanguage();

  if (!modalServiceId) return null;

  const service = dentalServices.find((s) => s.id === modalServiceId);
  if (!service) return null;

  const title = currentLang === "bn" ? service.titleBn : service.titleEn;
  const badge = currentLang === "bn" ? service.titleEn : "Sakib Dental Care Service";
  const desc =
    currentLang === "bn"
      ? service.shortDescBn
      : currentLang === "en"
      ? service.shortDescEn
      : `${service.shortDescEn} (${service.shortDescBn})`;
  const duration = currentLang === "bn" ? service.durationBn : service.durationEn;
  const tech = currentLang === "bn" ? service.techBn : service.techEn;
  const careTip = currentLang === "bn" ? service.careTipBn : service.careTipEn;

  const handleBook = () => {
    closeServiceModal();
    preselectServiceById(service.id);
  };

  return (
    <div
      id="serviceModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md transition-opacity"
      onClick={closeServiceModal}
    >
      <div
        className="apple-glass-strong rounded-2xl sm:rounded-[32px] max-w-lg w-full p-5 sm:p-8 space-y-4 sm:space-y-5 relative border border-white/60 dark:border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              id="modalServiceIcon"
              className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl shrink-0"
            >
              <i className={`ph-duotone ${service.icon}`} />
            </div>
            <div>
              <span
                id="modalServiceBadge"
                className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400"
              >
                {badge}
              </span>
              <h3
                id="modalServiceTitle"
                className="text-xl font-extrabold text-slate-900 dark:text-white"
              >
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={closeServiceModal}
            className="w-9 h-9 rounded-full apple-glass-subtle flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors shrink-0"
          >
            <i className="ph-bold ph-x" />
          </button>
        </div>

        <p
          id="modalServiceDesc"
          className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed"
        >
          {desc}
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="apple-glass-subtle rounded-2xl p-3.5">
            <span className="text-slate-400 block">{t("modalDurationLabel")}</span>
            <p
              id="modalServiceDuration"
              className="font-bold text-slate-900 dark:text-white mt-0.5 text-sm"
            >
              {duration}
            </p>
          </div>
          <div className="apple-glass-subtle rounded-2xl p-3.5">
            <span className="text-slate-400 block">{t("modalTechLabel")}</span>
            <p
              id="modalServiceTech"
              className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 text-sm"
            >
              {tech}
            </p>
          </div>
        </div>

        <div className="apple-glass-subtle rounded-2xl p-4 space-y-1.5">
          <p className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
            <i className="ph-fill ph-info" />
            <span>{t("modalCareHeading")}</span>
          </p>
          <p id="modalServiceCare" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {careTip}
          </p>
        </div>

        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleBook}
            className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="ph-bold ph-calendar-check" />
            <span>{t("modalBookBtnText")}</span>
          </button>
          <button
            type="button"
            onClick={closeServiceModal}
            className="px-5 py-3.5 rounded-2xl apple-glass-subtle font-bold text-sm text-center"
          >
            {t("modalCloseBtnText")}
          </button>
        </div>
      </div>
    </div>
  );
};
