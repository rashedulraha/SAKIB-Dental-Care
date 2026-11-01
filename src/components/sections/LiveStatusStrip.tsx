"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useClinic } from "@/context/ClinicContext";
import { toBanglaDigits } from "@/data/translations";
import { Container } from "@/components/common/Container";

export const LiveStatusStrip: React.FC = () => {
  const { currentLang, t } = useLanguage();
  const {
    settings,
    hotline,
    hotlineTel,
    whatsappNumber,
    whatsappLink,
    noticeActive,
    noticeText,
    nawhataHours,
    cityHours,
  } = useClinic();
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

      // If emergency notice is active in dashboard, show it
      if (noticeActive && noticeText) {
        setStatusMessage(noticeText);
        return;
      }

      if (isFriday) {
        setStatusMessage(
          currentLang === "bn"
            ? "আজ শুক্রবার: উভয় শাখা বন্ধ রয়েছে (জরুরি প্রয়োজনে WhatsApp-এ যোগাযোগ করুন)"
            : "TODAY IS FRIDAY: Both branches closed (Contact WhatsApp for urgent inquiries)"
        );
        return;
      }

      const nawhataOpen = hour >= 9 && hour < 21; // 9:00 AM - 9:00 PM
      const cityOpen = hour >= 17 && hour < 22; // 5:00 PM - 10:00 PM

      if (nawhataOpen && cityOpen) {
        setStatusMessage(
          currentLang === "bn"
            ? `এখন উভয় শাখা খোলা আছে: নওহাটা (${nawhataHours}) ও শহর শাখা (${cityHours})`
            : `OPEN NOW: Both Branches Open (Nowhata & City Branch)`
        );
      } else if (nawhataOpen) {
        setStatusMessage(
          currentLang === "bn"
            ? `এখন খোলা আছে: নওহাটা শাখা (${nawhataHours}) • বিকাল ৫টা থেকে শহর শাখা`
            : `OPEN NOW: Nowhata Branch (${nawhataHours}) • City Branch opens at 5:00 PM`
        );
      } else if (cityOpen) {
        setStatusMessage(
          currentLang === "bn"
            ? `এখন খোলা আছে: শহর শাখা (${cityHours})`
            : `OPEN NOW: City Branch (${cityHours})`
        );
      } else {
        setStatusMessage(
          currentLang === "bn"
            ? `নওহাটা শাখা: ${nawhataHours} • শহর শাখা: ${cityHours} (অনলাইন সিরিয়াল চলছে)`
            : `Nowhata: ${nawhataHours} • City: ${cityHours} (24/7 Online Booking)`
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [currentLang, noticeActive, noticeText, nawhataHours, cityHours]);

  return (
    <div className="w-full apple-glass-strong border-b border-white/30 dark:border-white/10 text-xs sm:text-sm py-3 px-4 relative z-30">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        {/* Live Status Indicator or Emergency Notice */}
        <div className="flex items-center gap-2.5">
          {noticeActive ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 shrink-0">
              <i className="ph-fill ph-megaphone text-xs" />
              <span>{currentLang === "bn" ? "জরুরি নোটিশ" : "Notice"}</span>
            </span>
          ) : (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          )}

          <span
            id="liveBranchStatusText"
            className={`font-medium ${
              noticeActive
                ? "text-amber-700 dark:text-amber-300 font-bold"
                : "text-slate-700 dark:text-slate-200"
            }`}
          >
            {statusMessage}
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 shrink-0">
            <i className="ph-fill ph-clock" />
            <span id="liveClockDisplay">{currentTimeStr}</span>
          </span>
        </div>

        {/* Direct WhatsApp Serial */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          <span
            id="topXrayBadge"
            className="hidden lg:inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20"
          >
            <i className="ph-fill ph-sparkle" />
            <span>{t("topXrayHighlight")}</span>
          </span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-sky-700 dark:text-sky-300 hover:underline shrink-0"
          >
            <i className="ph-fill ph-whatsapp-logo text-base text-emerald-500" />
            <span>WhatsApp / Serial: {whatsappNumber}</span>
          </a>
        </div>
      </Container>
    </div>
  );
};
