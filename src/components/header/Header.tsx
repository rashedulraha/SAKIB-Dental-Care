"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useClinic } from "@/context/ClinicContext";
import { Container } from "@/components/common/Container";

export const Header: React.FC = () => {
  const { currentLang, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { hotline, hotlineTel } = useClinic();
  const [activeNav, setActiveNav] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);

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

  // Scroll observer: Dynamic navbar color transition past Hero + Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect if user scrolled past Hero Section
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight - 80;
        setIsScrolledPastHero(window.scrollY >= heroBottom);
      } else {
        setIsScrolledPastHero(window.scrollY > 420);
      }

      // 2. Scrollspy active section detection
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

    handleScroll();
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
      ? "সাকিব ডেন্টাল"
      : "Sakib • সাকিব";

  const brandSub =
    currentLang === "en"
      ? "DENTAL CARE • RAJSHAHI"
      : currentLang === "bn"
      ? "নওহাটা বাজার ও রাজশাহী শহর শাখা"
      : "DENTAL CARE • RAJSHAHI";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full h-[68px] sm:h-[78px] transition-all duration-300 ease-in-out ${
        isScrolledPastHero
          ? "bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-md shadow-slate-900/5"
          : "bg-[#070b16]/95 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/40"
      }`}
    >
      <Container className="h-full flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-4 !px-2.5 xs:!px-3 sm:!px-6">
        {/* Left Brand Crest & Name */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "#hero", "hero")}
          className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 group shrink-0 min-w-0"
        >
          {/* Circular Prestige Dental Crest Emblem */}
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md ring-2 ring-amber-400/70 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full rounded-full border border-slate-200 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/80 via-white to-sky-50 relative overflow-hidden">
              <i className="ph-fill ph-tooth text-sky-600 text-sm xs:text-base sm:text-lg leading-none" />
              <span className="text-[5px] xs:text-[6px] font-black tracking-tighter text-rose-600 uppercase mt-0.5">
                SDC
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span
              id="navBrandTitle"
              className={`text-xs xs:text-sm sm:text-base md:text-[18px] font-extrabold tracking-tight leading-tight truncate transition-colors duration-200 ${
                isScrolledPastHero
                  ? "text-slate-900 dark:text-white"
                  : "text-white"
              }`}
            >
              {brandTitle}
            </span>
            <span
              id="navBrandSub"
              className={`text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] leading-tight mt-0.5 truncate hidden lg:block transition-colors duration-200 ${
                isScrolledPastHero
                  ? "text-slate-500 dark:text-slate-400"
                  : "text-slate-300/80"
              }`}
            >
              {brandSub}
            </span>
          </div>
        </a>

        {/* Center Pill Track Navigation Menu (Desktop & Laptop - lg and up) */}
        <nav
          aria-label="Main Navigation"
          className={`hidden lg:flex items-center rounded-full p-1 gap-1 shadow-inner shrink-0 transition-all duration-300 ${
            isScrolledPastHero
              ? "bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.12]"
              : "bg-white/[0.04] border border-white/[0.12]"
          }`}
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
                    ? isScrolledPastHero
                      ? "bg-sky-500 text-white shadow-sm dark:bg-white/20 dark:text-white"
                      : "bg-white/20 text-white shadow-sm"
                    : isScrolledPastHero
                    ? "text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>

        {/* Right Control Cluster */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher Pill */}
          <div
            className={`h-8 sm:h-9 flex items-center rounded-full p-0.5 sm:p-1 text-xs font-bold shrink-0 transition-all duration-300 ${
              isScrolledPastHero
                ? "bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.14] text-slate-700 dark:text-white"
                : "bg-white/[0.04] border border-white/[0.14] text-white"
            }`}
          >
            <button
              type="button"
              id="langBtn-en"
              onClick={() => setLanguage("en")}
              className={`h-6 sm:h-7 px-1.5 xs:px-2 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                currentLang === "en"
                  ? isScrolledPastHero
                    ? "bg-sky-500 text-white shadow-sm dark:bg-white/20 dark:text-white"
                    : "bg-white/20 text-white shadow-sm"
                  : isScrolledPastHero
                  ? "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
              className={`h-6 sm:h-7 px-1.5 xs:px-2 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                currentLang === "bn"
                  ? isScrolledPastHero
                    ? "bg-sky-500 text-white shadow-sm dark:bg-white/20 dark:text-white"
                    : "bg-white/20 text-white shadow-sm"
                  : isScrolledPastHero
                  ? "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
              className={`hidden md:inline-flex h-7 px-2.5 items-center rounded-full text-[11px] transition-all cursor-pointer ${
                currentLang === "bi"
                  ? isScrolledPastHero
                    ? "bg-sky-500 text-white shadow-sm dark:bg-white/20 dark:text-white"
                    : "bg-white/20 text-white shadow-sm"
                  : isScrolledPastHero
                  ? "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer ${
              isScrolledPastHero
                ? "bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.14] text-slate-700 hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-300 hover:bg-slate-200/80 dark:hover:bg-white/10"
                : "bg-white/[0.04] border border-white/[0.14] text-slate-200 hover:text-amber-300 hover:bg-white/10"
            }`}
            title="Switch Page Glass Theme"
          >
            <i
              id="themeIcon"
              className={`ph-fill ${isDark ? "ph-sun" : "ph-moon-stars"} text-xs sm:text-base`}
            />
          </button>

          {/* Compound Action Capsule: Book Serial CTA + Direct Hotline Phone Call */}
          <div
            className={`h-8 sm:h-9 flex items-center rounded-full p-0.5 sm:p-1 gap-0.5 sm:gap-1 shrink-0 transition-all duration-300 ${
              isScrolledPastHero
                ? "bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.14]"
                : "bg-white/[0.04] border border-white/[0.14]"
            }`}
          >
            <a
              href="#booking"
              onClick={(e) => scrollToSection(e, "#booking", "booking")}
              className="h-6 sm:h-7 inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[10px] sm:text-xs font-bold px-2 xs:px-2.5 sm:px-3.5 rounded-full shadow-md shadow-blue-600/30 transition-all whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse shrink-0" />
              <i className="ph-bold ph-squares-four text-[10px] sm:text-sm shrink-0" />
              <span className="hidden sm:inline">{t("navCtaBtn")}</span>
              <span className="inline sm:hidden">{currentLang === "bn" ? "সিরিয়াল" : "Book"}</span>
            </a>
            {/* Direct Hotline Phone Call Button */}
            <a
              href={hotlineTel}
              title={`Call Hotline: ${hotline}`}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                isScrolledPastHero
                  ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/80 dark:hover:bg-emerald-500/20"
                  : "text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
              }`}
            >
              <i className="ph-fill ph-phone-call text-[10px] sm:text-xs" />
            </a>
          </div>

          {/* Mobile/Tablet Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isScrolledPastHero
                ? "bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.14] text-slate-800 dark:text-slate-200 hover:bg-slate-200"
                : "bg-white/[0.04] border border-white/[0.14] text-slate-200 hover:text-white hover:bg-white/10"
            }`}
            title="Navigation Menu"
          >
            <i className={`ph-bold ${mobileMenuOpen ? "ph-x" : "ph-list"} text-sm sm:text-base`} />
          </button>
        </div>
      </Container>

      {/* Mobile Menu Backdrop Dimmer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[68px] sm:top-[78px] bg-black/75 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Dropdown Navigation Drawer (< lg) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-[68px] sm:top-[78px] inset-x-0 transition-all duration-300 z-50 shadow-2xl ${
            isScrolledPastHero
              ? "bg-white/98 dark:bg-[#090e1f] border-b border-slate-200 dark:border-white/15"
              : "bg-[#090e1f] border-b border-white/15"
          }`}
        >
          <Container className="py-4 space-y-3.5 !px-4">
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
                        ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400"
                        : isScrolledPastHero
                        ? "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 bg-slate-50 dark:bg-[#111933] border border-slate-200 dark:border-white/10"
                        : "text-slate-200 hover:bg-white/10 bg-[#111933] border border-white/10"
                    }`}
                  >
                    <i className="ph-fill ph-check-circle text-base text-sky-500 shrink-0" />
                    <span className="truncate">{t(item.key)}</span>
                  </a>
                );
              })}
            </div>

            {/* Quick Action Bar inside Mobile Drawer */}
            <div
              className={`pt-2.5 flex flex-col xs:flex-row items-stretch xs:items-center gap-2 border-t ${
                isScrolledPastHero ? "border-slate-200 dark:border-white/10" : "border-white/10"
              }`}
            >
              <a
                href="#booking"
                onClick={(e) => scrollToSection(e, "#booking", "booking")}
                className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-2"
              >
                <i className="ph-bold ph-calendar-plus text-sm" />
                <span>{t("navBooking")}</span>
              </a>
              <a
                href={hotlineTel}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                  isScrolledPastHero
                    ? "bg-slate-100 hover:bg-slate-200 dark:bg-[#111933] dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                    : "bg-[#111933] hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white"
                }`}
              >
                <i className="ph-fill ph-phone-call text-emerald-500 text-sm" />
                <span>{hotline}</span>
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
