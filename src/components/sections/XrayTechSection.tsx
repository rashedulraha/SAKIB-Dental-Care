"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TechTab } from "@/types";

export const XrayTechSection: React.FC = () => {
  const { currentLang, t, preselectServiceById } = useLanguage();
  const [activeTab, setActiveTab] = useState<TechTab>("xray");
  const isBn = currentLang === "bn";

  return (
    <section id="xray-tech" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Interactive Dental Tech & X-Ray Preview */}
        <div className="lg:col-span-6">
          <div className="apple-glass-strong rounded-[32px] p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {t("techHeaderLeft")}
                </span>
              </div>
              <span className="text-xs font-semibold apple-glass-subtle px-3 py-1 rounded-full">
                {t("techHeaderRight")}
              </span>
            </div>

            {/* Interactive Mode Switcher inside Showcase */}
            <div className="grid grid-cols-3 gap-2 apple-glass-subtle p-1.5 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("xray")}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  activeTab === "xray"
                    ? "bg-sky-500 text-white shadow"
                    : "text-slate-700 dark:text-slate-200 hover:bg-white/40"
                }`}
              >
                {t("techTab1")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("laser")}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  activeTab === "laser"
                    ? "bg-sky-500 text-white shadow"
                    : "text-slate-700 dark:text-slate-200 hover:bg-white/40"
                }`}
              >
                {t("techTab2")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sterile")}
                className={`py-2.5 px-3 rounded-xl transition-all ${
                  activeTab === "sterile"
                    ? "bg-sky-500 text-white shadow"
                    : "text-slate-700 dark:text-slate-200 hover:bg-white/40"
                }`}
              >
                {t("techTab3")}
              </button>
            </div>

            {/* Dynamic SVG Visual Screen */}
            <div
              id="techPreviewScreen"
              className="rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white p-6 min-h-[260px] flex flex-col justify-between relative overflow-hidden border border-sky-400/30 shadow-inner"
            >
              {activeTab === "xray" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-sky-300 block">
                        RVG DIGITAL SENSOR • DENTAL X-RAY
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {isBn
                          ? "এখানে যত্ন সহকারে দাঁতের এক্স-রে (ছবি) করা হয়"
                          : "Dental X-Rays (Imaging) Performed Here with Utmost Care"}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-mono">
                      HD 100%
                    </span>
                  </div>
                  <div className="my-4 flex flex-col sm:flex-row items-center justify-center gap-5 py-4 px-3 rounded-xl bg-black/40 border border-sky-500/30 relative">
                    <svg
                      className="w-24 h-24 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] shrink-0"
                      viewBox="0 0 100 100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        d="M28 25 C28 14, 42 14, 50 22 C58 14, 72 14, 72 25 C74 42, 66 55, 62 82 C60 88, 54 88, 52 70 C50 60, 50 60, 48 70 C46 88, 40 88, 38 82 C34 55, 26 42, 28 25 Z"
                        fill="rgba(56,189,248,0.18)"
                      />
                      <path
                        d="M40 35 C42 52, 42 65, 42 78"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                        strokeDasharray="3 2"
                      />
                      <path d="M60 35 C58 52, 58 65, 58 78" stroke="#38bdf8" strokeWidth="2.5" />
                      <circle
                        cx="42"
                        cy="79"
                        r="5"
                        fill="#f43f5e"
                        fillOpacity="0.5"
                        stroke="#f43f5e"
                      />
                    </svg>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-sky-200">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>
                          {isBn
                            ? "শিকড়ের গভীর ইনফেকশন নির্ভুল শনাক্তকরণ"
                            : "Pinpoint hidden root canal & periapical infections"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-200">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                        <span>
                          {isBn
                            ? "রুট ক্যানাল দৈর্ঘ্য ও ক্যাপ ফিটনেস যাচাই"
                            : "Verify exact root canal working length & crown fit"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-200">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span>
                          {isBn
                            ? "আক্কেল দাঁত ও চোয়ালের হাড়ের অবস্থান নির্ণয়"
                            : "Inspect impacted wisdom teeth & bone levels safely"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-sky-200/90">
                    {isBn
                      ? "বাইরে যাওয়ার ঝামেলা নেই—চেম্বারেই তাৎক্ষণিক দাঁতের এক্স-রে করে সঠিক চিকিৎসা শুরু করা হয়।"
                      : "No need to visit external diagnostic centers—get instant, high-clarity dental X-rays inside our clinic."}
                  </p>
                </>
              )}

              {activeTab === "laser" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-teal-300 block">
                        LED LIGHT-CURE COSMETIC RESTORATION
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {isBn
                          ? "লেজার মাধ্যমে দাঁতের কালার ম্যাচিং ফিলিং"
                          : "Laser Tooth-Color Matching Aesthetic Filling"}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs">
                      Natural Shade
                    </span>
                  </div>
                  <div className="my-4 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 py-4 px-4 rounded-xl bg-black/40 border border-teal-500/30">
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[10px] uppercase text-rose-300 font-bold">
                        {isBn ? "চিকিৎসার পূর্বে" : "Before Care"}
                      </span>
                      <p className="text-sm font-bold text-white mt-1">
                        {isBn ? "ভাঙা বা কালো গর্তযুক্ত দাঁত" : "Chipped or Dark Cavity Tooth"}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-1">
                        {isBn ? "খাবার আটকে যাওয়া ও শিরশিরানি" : "Food trapping & sensitivity"}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-teal-500/20 border border-teal-400/40">
                      <span className="text-[10px] uppercase text-emerald-300 font-bold">
                        {isBn ? "লেজার ফিলিংয়ের পরে" : "After Laser Filling"}
                      </span>
                      <p className="text-sm font-bold text-white mt-1">
                        {isBn
                          ? "১০০% আসল দাঁতের রঙের সাথে ম্যাচিং"
                          : "100% Natural Enamel Shade Match"}
                      </p>
                      <p className="text-[11px] text-teal-200 mt-1">
                        {isBn ? "মজবুত, মসৃণ ও প্রাকৃতিক হাসি" : "Strong, invisible & glossy finish"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-sky-200/90">
                    {isBn
                      ? "স্থায়ী ও অস্থায়ী সকল ধরনের ফিলিং এবং কসমেটিক ক্রাউন ও ব্রিজের মাধ্যমে দাঁত পূর্বাবস্থায় ফিরিয়ে আনা হয়।"
                      : "We provide permanent & temporary fillings as well as Crowns and Bridges to restore teeth seamlessly."}
                  </p>
                </>
              )}

              {activeTab === "sterile" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-emerald-300 block">
                        100% AUTOCLAVE STERILIZATION
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        {isBn
                          ? "সর্বাধুনিক যন্ত্রপাতি ও জীবাণুমুক্ত পরিবেশ"
                          : "Ultra-Modern Equipment & 100% Germ-Free Environment"}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs">
                      Bio-Safe
                    </span>
                  </div>
                  <div className="my-4 grid grid-cols-1 xs:grid-cols-3 gap-2.5 py-4 px-3 rounded-xl bg-black/40 border border-emerald-500/30 text-center">
                    <div className="p-2.5 rounded-lg bg-white/5">
                      <i className="ph-fill ph-thermometer-hot text-2xl text-emerald-400" />
                      <p className="text-xs font-bold mt-1">
                        {isBn ? "অটোক্লেভ হিট" : "Autoclave Sterile"}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {isBn ? "উচ্চ তাপমাত্রায় জীবাণুমুক্ত" : "High-pressure steam cycle"}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5">
                      <i className="ph-fill ph-hand-soap text-2xl text-sky-400" />
                      <p className="text-xs font-bold mt-1">
                        {isBn ? "ডিসপোজেবল কিট" : "Single-Use Kit"}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {isBn ? "নতুন গ্লাভস, মাস্ক ও সাকশন" : "Fresh gloves, mask & tips"}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5">
                      <i className="ph-fill ph-shield-check text-2xl text-indigo-400" />
                      <p className="text-xs font-bold mt-1">
                        {isBn ? "পেইনলেস কেয়ার" : "Painless Protocol"}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {isBn ? "নিরাপদ লোকাল অ্যানেস্থেসিয়া" : "Gentle local anesthesia"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-sky-200/90">
                    {isBn
                      ? "আপনার ও আপনার পরিবারের স্বাস্থ্য সুরক্ষায় আমরা প্রতিটি যন্ত্রপাতি শতভাগ জীবাণুমুক্ত করে ব্যবহার করি।"
                      : "Every instrument is sealed and sterilized to guarantee zero cross-contamination for your family."}
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
              <span>
                <i className="ph-fill ph-check-circle text-emerald-500 mr-1" />
                <span>{t("techFooterNote")}</span>
              </span>
              <button
                type="button"
                onClick={() => preselectServiceById(10)}
                className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                {t("techBookXrayLink")}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Why Choose Sakib Dental Care */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <i className="ph-fill ph-shield-star" />
            <span>{t("whyTag")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {t("whyTitle")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t("whyDesc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="apple-glass rounded-2xl p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl">
                <i className="ph-fill ph-scan" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t("whyCard1Title")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t("whyCard1Desc")}</p>
            </div>

            <div className="apple-glass rounded-2xl p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
                <i className="ph-fill ph-shield-check" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t("whyCard2Title")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t("whyCard2Desc")}</p>
            </div>

            <div className="apple-glass rounded-2xl p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl">
                <i className="ph-fill ph-magic-wand" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t("whyCard3Title")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t("whyCard3Desc")}</p>
            </div>

            <div className="apple-glass rounded-2xl p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">
                <i className="ph-fill ph-smiley" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {t("whyCard4Title")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t("whyCard4Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
