"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useClinic } from "@/context/ClinicContext";

export const FloatingWhatsApp: React.FC = () => {
  const pathname = usePathname();
  const { whatsappLink, whatsappNumber } = useClinic();

  // Hide floating WhatsApp on admin portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Direct WhatsApp Chat ${whatsappNumber}`}
      title={`Chat on WhatsApp: ${whatsappNumber}`}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] border-2 border-white/30 transition-all duration-300 hover:scale-105 group"
    >
      <i className="ph-fill ph-whatsapp-logo text-2xl sm:text-[28px] drop-shadow-sm group-hover:rotate-6 transition-transform" />
    </a>
  );
};
