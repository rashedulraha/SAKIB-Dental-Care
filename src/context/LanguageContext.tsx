"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Language, BranchKey } from "@/types";
import { uiTranslations } from "@/data/translations";
import { useToast } from "./ToastContext";

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language, showNotification?: boolean) => void;
  cycleMobileLanguage: () => void;
  t: (key: string) => string;
  formatDualText: (enText: string, bnText: string) => string;
  selectedBranch: BranchKey;
  setSelectedBranch: (branch: BranchKey) => void;
  selectedServiceId: number;
  setSelectedServiceId: (id: number) => void;
  modalServiceId: number | null;
  openServiceModal: (id: number) => void;
  closeServiceModal: () => void;
  quickSelectBranch: (branch: BranchKey) => void;
  preselectServiceById: (id: number) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLangState] = useState<Language>("en");
  const [selectedBranch, setSelectedBranch] = useState<BranchKey>("nawhata");
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);
  const [modalServiceId, setModalServiceId] = useState<number | null>(null);
  const { showToast } = useToast();

  const setLanguage = useCallback(
    (lang: Language, showNotification = true) => {
      setCurrentLangState(lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang === "bn" ? "bn" : "en";
      }

      if (showNotification) {
        const modeTitle =
          lang === "en"
            ? "English Language Active"
            : lang === "bn"
            ? "বাংলা ভাষা চালু হয়েছে"
            : "Bilingual Mode (EN + বাংলা)";
        const modeDesc =
          lang === "en"
            ? "All clinic content is now displayed in English."
            : lang === "bn"
            ? "ওয়েবসাইটের সকল তথ্য বাংলায় পরিবর্তিত হয়েছে।"
            : "Showing both English and Bangla side-by-side.";
        showToast(modeTitle, modeDesc);
      }
    },
    [showToast]
  );

  const cycleMobileLanguage = useCallback(() => {
    setCurrentLangState((prev) => {
      const next: Language = prev === "en" ? "bn" : prev === "bn" ? "bi" : "en";
      setLanguage(next, true);
      return next;
    });
  }, [setLanguage]);

  const t = useCallback(
    (key: string): string => {
      const enVal = uiTranslations.en[key] || "";
      const bnVal = uiTranslations.bn[key] || "";

      if (currentLang === "en") return enVal;
      if (currentLang === "bn") return bnVal;

      if (
        key.startsWith("nav") ||
        key.startsWith("sim") ||
        key.startsWith("filter") ||
        key.startsWith("mob") ||
        key.startsWith("techTab") ||
        key.startsWith("heroPrimary") ||
        key.startsWith("heroSecondary")
      ) {
        return enVal;
      }
      return `${enVal} (${bnVal})`;
    },
    [currentLang]
  );

  const formatDualText = useCallback(
    (enText: string, bnText: string): string => {
      if (currentLang === "en") return enText;
      if (currentLang === "bn") return bnText;
      return `${enText} (${bnText})`;
    },
    [currentLang]
  );

  const openServiceModal = (id: number) => {
    setModalServiceId(id);
  };

  const closeServiceModal = () => {
    setModalServiceId(null);
  };

  const quickSelectBranch = (branch: BranchKey) => {
    setSelectedBranch(branch);
    if (typeof document !== "undefined") {
      const el = document.getElementById("booking");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const preselectServiceById = (id: number) => {
    setSelectedServiceId(id);
    if (typeof document !== "undefined") {
      const el = document.getElementById("booking");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        cycleMobileLanguage,
        t,
        formatDualText,
        selectedBranch,
        setSelectedBranch,
        selectedServiceId,
        setSelectedServiceId,
        modalServiceId,
        openServiceModal,
        closeServiceModal,
        quickSelectBranch,
        preselectServiceById,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
