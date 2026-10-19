"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Container } from "@/components/common/Container";

export const Header: React.FC = () => {
  const { currentLang, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { href: "#hero", key: "navHome", id: "hero", icon: "ph-house" },
    { href: "#xray-tech", key: "navXray", id: "xray-tech", icon: "ph-scan" },
    { href: "#branches", key: "navBranches", id: "branches", icon: "ph-buildings" },
    { href: "#services", key: "navServices", id: "services", icon: "ph-tooth" },
    { href: "#symptom-guide", key: "navSymptoms", id: "symptom-guide", icon: "ph-first-aid" },
    { href: "#footer-contact", key: "navContact", id: "footer-contact", icon: "ph-phone" },
  ];

  // Smooth scroll handler that accurately factors in the fixed header height
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
      e.preventDefault();
      setActiveNav(id);
      setMobileMenuOpen(false);

      if (href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", href);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 84;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);
      }
    },
    []
  );

  // Active section scrollspy observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const item = navLinks[i];
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          if (scrollPos >= top) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const brandTitle =
    currentLang === "en"
      ? "Sakib"
      : currentLang === "bn"
      ? "সাকিব ডেন্টাল কেয়ার"
      : "Sakib • সাকিব ডেন্টাল";

  const brandSub =
    currentLang === "en"
      ? "DENTAL CARE • RAJSHAHI"
      : currentLang === "bn"
      ? "নওহাটা বাজার ও রাজশাহী শহর শাখা"
      : "DENTAL CARE • RAJSHAHI";

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full h-[78px] bg-[#070b16]/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 shadow-lg shadow-black/20">
      <Container className="h-full flex items-center justify-between gap-2 sm:gap-3">
        {/* Left Brand Crest & Stacked Name */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero", "hero")}
          className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0"
        >
          {/* Circular Prestige Dental Crest Emblem */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md ring-2 ring-amber-400/70 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full rounded-full border border-slate-200 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/80 via-white to-sky-50 relative overflow-hidden">
              <i className="ph-fill ph-tooth text-sky-600 text-base sm:text-lg leading-none" />
              <span className="text-[6px] font-black tracking-tighter text-rose-600 uppercase mt-0.5">
                SDC
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span
              id="navBrandTitle"
              className="text-white text-sm sm:text-base md:text-[18px] font-extrabold tracking-tight leading-tight truncate max-w-[120px] xs:max-w-[160px] sm:max-w-none"
            >
              {brandTitle}
            </span>
            <span
              id="navBrandSub"
              className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-slate-300/80 leading-tight mt-0.5 truncate hidden xs:block max-w-[140px] sm:max-w-none"
            >
              {brandSub}
            </span>
          </div>
        </a>

        {/* Center Pill Track Navigation Menu (Desktop & Laptop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center bg-white/[0.04] border border-white/[0.12] rounded-full p-1 gap-1 shadow-inner shrink-0"
        >
          {navLinks.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href, item.id)}
                className={`nav-pill-item px-3 xl:px-4 py-1.5 rounded-full text-[10px] xl:text-[11px] font-bold uppercase tracking-wider xl:tracking-widest transition-all ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>

        {/* Right Control Cluster - Pixel-Perfect Height Standardization (h-9 / 36px) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Pill */}
          <div className="h-9 flex items-center bg-white/[0.04] border border-white/[0.14] rounded-full p-1 text-xs font-bold text-white">
            <button
              type="button"
              id="langBtn-en"
              onClick={() => setLanguage("en")}
              className={`h-7 px-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                currentLang === "en"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="English Language"
            >
              EN
            </button>
            <button
              type="button"
              id="langBtn-bn"
              onClick={() => setLanguage("bn")}
              className={`h-7 px-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                currentLang === "bn"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="বাংলা ভাষা"
            >
              বাংলা
            </button>
            <button
              type="button"
              id="langBtn-bi"
              onClick={() => setLanguage("bi")}
              className={`hidden md:inline-flex h-7 px-2.5 items-center rounded-full text-[11px] transition-all ${
                currentLang === "bi"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Bilingual (English + বাংলা)"
            >
              EN/বাং
            </button>
          </div>

          {/* Light/Dark Glass Theme Button */}
          <button
            id="themeToggleBtn"
            onClick={toggleTheme}
            aria-label="Toggle Dark or Light Glass Mode"
            className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.14] flex items-center justify-center text-slate-200 hover:text-amber-300 hover:bg-white/10 transition-all shrink-0"
            title="Switch Page Glass Theme"
          >
            <i
              id="themeIcon"
              className={`ph-fill ${isDark ? "ph-sun" : "ph-moon-stars"} text-base`}
            />
          </button>

          {/* Compound Action Capsule: Book Serial CTA + Direct Hotline Phone Call */}
          <div className="h-9 flex items-center bg-white/[0.04] border border-white/[0.14] rounded-full p-1 gap-1 shrink-0">
            <a
              href="#booking"
              onClick={(e) => scrollToSection(e, "#booking", "booking")}
              className="h-7 inline-flex items-center gap-1.5 sm:gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] sm:text-xs font-bold px-3 sm:px-3.5 rounded-full shadow-md shadow-blue-600/30 transition-all whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse shrink-0" />
              <i className="ph-bold ph-squares-four text-xs sm:text-sm shrink-0" />
              <span className="hidden sm:inline">{t("navCtaBtn")}</span>
              <span className="inline sm:hidden">{currentLang === "bn" ? "সিরিয়াল" : "Book"}</span>
            </a>
            {/* Real Hotline Phone Icon - Not Logout */}
            <a
              href="tel:+8801733054717"
              title="Call Hotline: 01733-054717"
              className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors shrink-0"
            >
              <i className="ph-fill ph-phone-call text-xs sm:text-sm" />
            </a>
          </div>

          {/* Mobile/Tablet Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.14] flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-all shrink-0"
            title="Navigation Menu"
          >
            <i className={`ph-bold ${mobileMenuOpen ? "ph-x" : "ph-list"} text-lg`} />
          </button>
        </div>
      </Container>

      {/* Mobile/Tablet Dropdown Navigation Drawer (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[78px] inset-x-0 bg-[#070b16]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 z-50">
          <Container className="py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl transition-all text-xs font-bold ${
                      isActive
                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                        : "text-slate-200 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    <i className={`ph-fill ${item.icon} text-base text-sky-400 shrink-0`} />
                    <span className="truncate">{t(item.key)}</span>
                  </a>
                );
              })}
            </div>

            {/* Quick Action Bar inside Mobile Drawer */}
            <div className="pt-2 border-t border-white/10 flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
              <a
                href="#booking"
                onClick={(e) => scrollToSection(e, "#booking", "booking")}
                className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-2"
              >
                <i className="ph-bold ph-calendar-plus text-sm" />
                <span>{t("navBooking")}</span>
              </a>
              <a
                href="tel:+8801733054717"
                className="px-3.5 py-2.5 rounded-xl apple-glass-subtle text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <i className="ph-fill ph-phone-call text-emerald-400 text-sm" />
                <span>01733-054717</span>
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
