"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { toBanglaDigits } from "@/data/translations";
import { Container } from "@/components/common/Container";

export const LiveStatusStrip: React.FC = () => {
  const { currentLang, t } = useLanguage();
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("--:-- --");
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const isFriday = now.getDay() === 5;

      const ampm = hour >= 12 ? "PM" : "AM";
      const hr12 = hour % 12 || 12;
      const minPadded = String(minute).padStart(2, "0");

      if (currentLang === "bn") {
        setCurrentTimeStr(`${toBanglaDigits(hr12)}:${toBanglaDigits(minPadded)} ${ampm}`);
      } else {
        setCurrentTimeStr(`${hr12}:${minPadded} ${ampm}`);
      }

      const nawhataOpen = !isFriday && hour >= 9 && hour < 18;
      const cityOpen = hour >= 19 && hour < 23;

      if (nawhataOpen) {
        setStatusMessage(
          currentLang === "bn"
            ? "এখন খোলা আছে: নওহাটা শাখা (সকাল ৯টা – সন্ধ্যা ৬টা) • সন্ধ্যা ৭টা থেকে শহর শাখা"
            : "OPEN NOW: Nowhata Branch (9:00 AM – 6:00 PM) • City Branch opens at 7:00 PM"
        );
      } else if (cityOpen) {
        setStatusMessage(
          currentLang === "bn"
            ? "এখন খোলা আছে: শহর শাখা - কসাইখানা মোড়, সপুরা (সন্ধ্যা ৭টা – রাত্রি ১১টা)"
            : "OPEN NOW: City Branch - Kasaikhana More, Sopura (7:00 PM – 11:00 PM)"
        );
      } else if (hour >= 18 && hour < 19) {
        setStatusMessage(
          currentLang === "bn"
            ? "নওহাটা শাখা সমাপ্ত • সন্ধ্যা ৭:০০ টায় শহর শাখা (সপুরা, রাজশাহী) শুরু হবে"
            : "Nowhata Branch closed for today • City Branch (Sopura, Rajshahi) opens at 7:00 PM"
        );
      } else {
        setStatusMessage(
          currentLang === "bn"
            ? "নওহাটা শাখা: সকাল ৯টা-সন্ধ্যা ৬টা • শহর শাখা (সপুরা): সন্ধ্যা ৭টা-রাত ১১টা (অনলাইন সিরিয়াল চলছে)"
            : "Nowhata Branch: 9:00 AM – 6:00 PM • City Branch (Sopura): 7:00 PM – 11:00 PM (24/7 Online Booking)"
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [currentLang]);

  return (
    <div className="w-full apple-glass-strong border-b border-white/30 dark:border-white/10 text-xs sm:text-sm py-3 px-4 relative z-30">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        {/* Live Status Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span id="liveBranchStatusText" className="font-medium text-slate-700 dark:text-slate-200">
            {statusMessage}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 shrink-0">
            <i className="ph-fill ph-clock" />
            <span id="liveClockDisplay">{currentTimeStr}</span>
          </span>
        </div>

        {/* Direct Hotline & X-Ray Highlight */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          <span
            id="topXrayBadge"
            className="hidden lg:inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20"
          >
            <i className="ph-fill ph-sparkle" />
            <span>{t("topXrayHighlight")}</span>
          </span>
          <a
            href="tel:+8801733054717"
            className="inline-flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-300 hover:underline shrink-0"
          >
            <i className="ph-fill ph-phone-call" />
            <span>WhatsApp: 01733-054717</span>
          </a>
          <a
            href="tel:+8801688434676"
            className="hidden sm:inline-flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300 hover:underline shrink-0"
          >
            <i className="ph-fill ph-calendar-check" />
            <span>{t("topSerialPhone")}</span>
          </a>
        </div>
      </Container>
    </div>
  );
};
