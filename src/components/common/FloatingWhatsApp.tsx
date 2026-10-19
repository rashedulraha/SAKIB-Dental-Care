"use client";

import React from "react";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/8801733054717?text=Hello%20Sakib%20Dental%20Care%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp 01733-054717"
      title="WhatsApp Direct Serial: 01733-054717"
      className="fixed bottom-20 md:bottom-6 right-5 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shadow-[0_10px_28px_rgba(34,197,94,0.45)] border-2 border-white/25 transition-all hover:scale-110"
    >
      <i className="ph-fill ph-whatsapp-logo text-2xl sm:text-3xl" />
    </a>
  );
};
