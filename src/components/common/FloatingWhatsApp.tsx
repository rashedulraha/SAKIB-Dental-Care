"use client";

import React from "react";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/8801733054717?text=Assalamu%20Alaikum%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Sakib%20Dental%20Care."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Chat 01733-054717"
      title="Chat on WhatsApp: 01733-054717"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] border-2 border-white/30 transition-all duration-300 hover:scale-105 group"
    >
      <i className="ph-fill ph-whatsapp-logo text-2xl sm:text-[28px] drop-shadow-sm group-hover:rotate-6 transition-transform" />
    </a>
  );
};
