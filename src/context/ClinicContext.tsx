"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "./LanguageContext";

export interface ClinicSettings {
  primaryHotline: string;
  whatsappNumber: string;
  emergencyPhone?: string;

  nawhataNameEn: string;
  nawhataNameBn: string;
  nawhataAddressEn: string;
  nawhataAddressBn: string;
  nawhataHoursEn: string;
  nawhataHoursBn: string;
  nawhataFridayClosed: boolean;
  nawhataMapUrl: string;

  cityNameEn: string;
  cityNameBn: string;
  cityAddressEn: string;
  cityAddressBn: string;
  cityHoursEn: string;
  cityHoursBn: string;
  cityMapUrl: string;

  noticeActive: boolean;
  noticeTextEn: string;
  noticeTextBn: string;

  // Social Media Links & Handles
  facebookUrl?: string;
  facebookUsername?: string;
  youtubeUrl?: string;
  youtubeUsername?: string;
}

export const defaultClinicSettings: ClinicSettings = {
  primaryHotline: "01733-054717",
  whatsappNumber: "01733-054717",
  emergencyPhone: "01733-054717",

  // Default Social Media
  facebookUrl: "https://facebook.com/sakibdentalcare",
  facebookUsername: "sakibdentalcare",
  youtubeUrl: "https://youtube.com/@sakibdentalcare",
  youtubeUsername: "@sakibdentalcare",

  nawhataNameEn: "Nowhata Branch (Nowhata Bazar)",
  nawhataNameBn: "নওহাটা শাখা (নওহাটা বাজার)",
  nawhataAddressEn: "East of Akbari Mosque (Mondol Market Ground Floor), Nowhata Bazar, Paba, Rajshahi",
  nawhataAddressBn: "আকবরী মসজিদের পূর্বে (মন্ডল মার্কেটের নীচ তলা), নওহাটা বাজার, পবা, রাজশাহী",
  nawhataHoursEn: "9:00 AM – 9:00 PM (Friday Closed)",
  nawhataHoursBn: "সকাল ৯:০০ টা – রাত ৯:০০ টা (শুক্রবার বন্ধ)",
  nawhataFridayClosed: true,
  nawhataMapUrl: "https://maps.google.com/?q=Nowhata+Bazar+Rajshahi",

  cityNameEn: "City Branch (Sopura, Rajshahi)",
  cityNameBn: "শহর শাখা (সপুরা, রাজশাহী)",
  cityAddressEn: "Kasaikhana More, Jinnahnagar, Sopura, Rajshahi",
  cityAddressBn: "কসাইখানা মোড়, জিন্নাহনগর, সপুরা, রাজশাহী",
  cityHoursEn: "5:00 PM – 10:00 PM (Friday Closed)",
  cityHoursBn: "বিকাল ৫:০০ টা – রাত ১০:০০ টা (শুক্রবার বন্ধ)",
  cityMapUrl: "https://maps.google.com/?q=Sopura+Rajshahi",

  noticeActive: false,
  noticeTextEn: "Welcome to Sakib Dental Care. Chambers at Nowhata Bazar & Rajshahi City.",
  noticeTextBn: "সাকিব ডেন্টাল কেয়ারে স্বাগতম। নওহাটা বাজার ও রাজশাহী শহর শাখায় নিয়মিত সেবা প্রদান করা হচ্ছে।",
};

interface ClinicContextType {
  settings: ClinicSettings;
  services: any[];
  loading: boolean;
  refresh: () => Promise<void>;

  // Clean phone numbers and links
  hotline: string;
  hotlineTel: string;
  whatsappNumber: string;
  whatsappLink: string;
  getWhatsAppLink: (customText?: string) => string;

  // Language-aware dynamic branch getters
  nawhataName: string;
  nawhataAddress: string;
  nawhataHours: string;
  nawhataFridayClosed: boolean;
  nawhataMapUrl: string;

  cityName: string;
  cityAddress: string;
  cityHours: string;
  cityMapUrl: string;

  // Notice
  noticeActive: boolean;
  noticeText: string;

  // Social Media
  facebookUrl: string;
  facebookUsername: string;
  youtubeUrl: string;
  youtubeUsername: string;
}

const ClinicContext = createContext<ClinicContextType | null>(null);

function cleanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("88")) return digits;
  if (digits.startsWith("0")) return "88" + digits;
  return "880" + digits;
}

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentLang } = useLanguage();
  const [settings, setSettings] = useState<ClinicSettings>(defaultClinicSettings);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchClinicData = useCallback(async () => {
    try {
      const res = await fetch("/api/public/data", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.settings) {
          setSettings((prev) => ({
            ...prev,
            ...data.settings,
          }));
        }
        if (data.services && Array.isArray(data.services)) {
          setServices(data.services);
        }
      }
    } catch (err) {
      console.warn("Public data load error, using reliable fallback:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClinicData();

    // Auto-refresh when tab comes into focus so dashboard edits reflect immediately
    const handleFocus = () => {
      fetchClinicData();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchClinicData]);

  const hotline = settings.primaryHotline || "01733-054717";
  const hotlineTel = `tel:+${cleanPhone(hotline)}`;

  const whatsappNumber = settings.whatsappNumber || "01733-054717";
  const defaultWhatsAppMsg = encodeURIComponent(
    currentLang === "bn"
      ? "আসসালামু আলাইকুম, আমি সাকিব ডেন্টাল কেয়ার থেকে সিরিয়াল বা পরামর্শ নিতে চাচ্ছি।"
      : "Assalamu Alaikum, I would like to book an appointment at Sakib Dental Care."
  );
  const whatsappLink = `https://wa.me/${cleanPhone(whatsappNumber)}?text=${defaultWhatsAppMsg}`;

  const getWhatsAppLink = useCallback(
    (customText?: string) => {
      const msg = customText ? encodeURIComponent(customText) : defaultWhatsAppMsg;
      return `https://wa.me/${cleanPhone(whatsappNumber)}?text=${msg}`;
    },
    [whatsappNumber, defaultWhatsAppMsg]
  );

  // Language-aware branch fields
  const isBn = currentLang === "bn";

  const nawhataName = useMemo(() => {
    return isBn
      ? settings.nawhataNameBn || defaultClinicSettings.nawhataNameBn
      : settings.nawhataNameEn || defaultClinicSettings.nawhataNameEn;
  }, [isBn, settings]);

  const nawhataAddress = useMemo(() => {
    return isBn
      ? settings.nawhataAddressBn || defaultClinicSettings.nawhataAddressBn
      : settings.nawhataAddressEn || defaultClinicSettings.nawhataAddressEn;
  }, [isBn, settings]);

  const nawhataHours = useMemo(() => {
    return isBn
      ? settings.nawhataHoursBn || defaultClinicSettings.nawhataHoursBn
      : settings.nawhataHoursEn || defaultClinicSettings.nawhataHoursEn;
  }, [isBn, settings]);

  const cityName = useMemo(() => {
    return isBn
      ? settings.cityNameBn || defaultClinicSettings.cityNameBn
      : settings.cityNameEn || defaultClinicSettings.cityNameEn;
  }, [isBn, settings]);

  const cityAddress = useMemo(() => {
    return isBn
      ? settings.cityAddressBn || defaultClinicSettings.cityAddressBn
      : settings.cityAddressEn || defaultClinicSettings.cityAddressEn;
  }, [isBn, settings]);

  const cityHours = useMemo(() => {
    return isBn
      ? settings.cityHoursBn || defaultClinicSettings.cityHoursBn
      : settings.cityHoursEn || defaultClinicSettings.cityHoursEn;
  }, [isBn, settings]);

  const noticeText = useMemo(() => {
    return isBn
      ? settings.noticeTextBn || settings.noticeTextEn || ""
      : settings.noticeTextEn || settings.noticeTextBn || "";
  }, [isBn, settings]);

  const value = {
    settings,
    services,
    loading,
    refresh: fetchClinicData,

    hotline,
    hotlineTel,
    whatsappNumber,
    whatsappLink,
    getWhatsAppLink,

    nawhataName,
    nawhataAddress,
    nawhataHours,
    nawhataFridayClosed: Boolean(settings.nawhataFridayClosed),
    nawhataMapUrl: settings.nawhataMapUrl || "https://maps.google.com/?q=Nowhata+Bazar+Rajshahi",

    cityName,
    cityAddress,
    cityHours,
    cityMapUrl: settings.cityMapUrl || "https://maps.google.com/?q=Sopura+Rajshahi",

    noticeActive: Boolean(settings.noticeActive),
    noticeText,

    // Social Media
    facebookUrl: settings.facebookUrl || defaultClinicSettings.facebookUrl || "",
    facebookUsername: settings.facebookUsername || defaultClinicSettings.facebookUsername || "",
    youtubeUrl: settings.youtubeUrl || defaultClinicSettings.youtubeUrl || "",
    youtubeUsername: settings.youtubeUsername || defaultClinicSettings.youtubeUsername || "",
  };

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
};

export const useClinic = (): ClinicContextType => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
};

