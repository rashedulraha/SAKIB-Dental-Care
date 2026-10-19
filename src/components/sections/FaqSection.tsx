"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      qKey: "faq1Q",
      aKey: "faq1A",
      iconColor: "text-sky-500",
    },
    {
      qKey: "faq2Q",
      aKey: "faq2A",
      iconColor: "text-rose-500",
    },
    {
      qKey: "faq3Q",
      aKey: "faq3A",
      iconColor: "text-teal-500",
    },
    {
      qKey: "faq4Q",
      aKey: "faq4A",
      iconColor: "text-indigo-500",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t("faqTitle")}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{t("faqSub")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="apple-glass rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <i className={`ph-fill ph-question ${faq.iconColor} text-xl shrink-0`} />
              <span>{t(faq.qKey)}</span>
            </h3>
            <p
              className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t(faq.aKey) }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
