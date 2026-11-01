"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useClinic } from "@/context/ClinicContext";
import { heroSlides } from "@/data/heroSlides";

export const Hero: React.FC = () => {
  const { currentLang, t, quickSelectBranch } = useLanguage();
  const { nawhataHours, cityHours, nawhataName, cityName } = useClinic();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = heroSlides[currentSlideIndex];

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-advance timer (8s per slide for relaxed visual absorption)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPlaying, handleNextSlide]);

  // Video playback handling
  useEffect(() => {
    if (!videoRef.current) return;
    if (slide.type === "video" && slide.videoUrl) {
      if (videoRef.current.src !== slide.videoUrl) {
        videoRef.current.src = slide.videoUrl;
        videoRef.current.load();
      }
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      videoRef.current.pause();
    }
  }, [currentSlideIndex, isPlaying, slide]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  const badgeText = currentLang === "bn" ? slide.badgeBn : slide.badgeEn;

  const renderTitle = () => {
    if (currentLang === "en") return slide.titleEn;
    if (currentLang === "bn") return slide.titleBn;
    return (
      <>
        {slide.titleEn}
        <span className="block text-xl sm:text-3xl md:text-4xl mt-2 text-sky-300 font-bold leading-snug">
          {slide.titleBn}
        </span>
      </>
    );
  };

  const renderSubtitle = () => {
    if (currentLang === "en") return slide.subEn;
    if (currentLang === "bn") return slide.subBn;
    return (
      <>
        {slide.subEn}
        <span className="block text-xs sm:text-sm mt-1.5 text-slate-300">
          {slide.subBn}
        </span>
      </>
    );
  };

  const captionText =
    currentLang === "en"
      ? slide.captionEn
      : currentLang === "bn"
      ? slide.captionBn
      : `${slide.captionEn} • ${slide.captionBn}`;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[82vh] sm:min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#040814] select-none pt-12 pb-20 sm:py-24"
    >
      {/* ============================================================== */}
      {/* BACKGROUND MEDIA LAYER: VIBRANT, CRYSTAL-CLEAR CLINIC VISUALS   */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Dental Video Layer */}
        {slide.type === "video" && slide.videoUrl && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster={slide.imageUrl}
            className={`absolute inset-0 w-full h-full object-cover hero-media-zoom transition-opacity duration-1000 ${
              !isPlaying ? "hero-media-paused" : ""
            } opacity-90`}
          >
            <source src={slide.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* High-Resolution Hero Background Image Layer (Natural Color, Crisp Definition) */}
        <img
          id="heroBackgroundImage"
          src={slide.imageUrl}
          alt="Sakib Dental Care Modern Clinic"
          className={`absolute inset-0 w-full h-full object-cover hero-media-zoom transition-all duration-1000 ${
            !isPlaying ? "hero-media-paused" : ""
          } ${slide.type === "video" ? "opacity-35" : "opacity-95"}`}
        />

        {/* Directional Filmic Scrim & Edge Vignettes (Keeps center image open & bright, darkens text zone) */}
        {/* 1. Subtle top header scrim for transparent navbar contrast */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#030712]/80 via-[#030712]/25 to-transparent pointer-events-none" />

        {/* 2. Progressive bottom-up scrim specifically framing the text and CTA area */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/75 via-40% via-[#040814]/20 via-75% to-transparent pointer-events-none" />

        {/* 3. Soft peripheral radial vignette to gently frame wide displays without drowning image details */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,8,20,0.65)_100%)] pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* HERO CONTENT CONTAINER: CLEAN TYPOGRAPHY & REFINED HIERARCHY   */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center space-y-4 sm:space-y-6">
        {/* Top Minimalist Pill Badge with Soft Pulse Accent */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/20 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] shrink-0 animate-pulse" />
          <span
            id="heroSlideBadge"
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-300"
          >
            {badgeText}
          </span>
        </div>

        {/* Main Display Headline (Apple Inter Display Hierarchy) */}
        <h1
          id="heroMainTitle"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-black text-white tracking-tight leading-[1.12] sm:leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)] max-w-4xl"
        >
          {renderTitle()}
        </h1>

        {/* Balanced, Highly Legible Subtitle */}
        <p
          id="heroSlideSubtitle"
          className="text-xs sm:text-base md:text-lg text-slate-100/90 font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {renderSubtitle()}
        </p>

        {/* Dual Primary & Secondary Action Pill Buttons */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full xs:w-auto">
          <a
            href="#services"
            className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-base px-6 sm:px-8 py-3.5 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>{t("heroPrimaryCta")}</span>
            <i className="ph-bold ph-arrow-right text-base" />
          </a>
          <a
            href="#booking"
            className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-base px-6 sm:px-8 py-3.5 rounded-full border border-white/20 backdrop-blur-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
          >
            <i className="ph-fill ph-calendar-plus text-sky-400 text-base" />
            <span>{t("heroSecondaryCta")}</span>
          </a>
        </div>

        {/* Refined Quick Branch Schedule Chips (Live Status Indicators) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
          <button
            type="button"
            onClick={() => quickSelectBranch("nawhata")}
            className="px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/15 backdrop-blur-md flex items-center gap-2 text-slate-200 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform shrink-0" />
            <span>
              <span className="font-semibold text-white">{nawhataName}:</span>{" "}
              <span className="text-slate-300">{nawhataHours}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => quickSelectBranch("city")}
            className="px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/15 backdrop-blur-md flex items-center gap-2 text-slate-200 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 group-hover:scale-125 transition-transform shrink-0" />
            <span>
              <span className="font-semibold text-white">{cityName}:</span>{" "}
              <span className="text-slate-300">{cityHours}</span>
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM CONTROLS: STREAMLINED SLIDE COUNTER & MEDIA BAR          */}
      {/* ============================================================== */}
      {/* Bottom-Left Slide Index Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-10 z-30 flex items-center gap-2 sm:gap-3">
        <div className="px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-mono font-bold tracking-wider shadow-sm flex items-center gap-1.5">
          <span id="heroSlideCurrentNum" className="text-sky-400">
            {slide.num}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">04</span>
        </div>
        <span
          id="heroSlideCaptionTag"
          className="hidden md:inline-block text-xs font-medium text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          {captionText}
        </span>
      </div>

      {/* Bottom-Right Streamlined Media Navigation Pill */}
      <div className="absolute bottom-4 sm:bottom-6 right-3 sm:right-10 z-30 flex items-center gap-1.5 sm:gap-2">
        {/* Previous Slide Button */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/60 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-sm"
        >
          <i className="ph-bold ph-caret-left text-xs sm:text-sm" />
        </button>

        {/* Play / Pause Button */}
        <button
          type="button"
          id="heroPlayPauseBtn"
          onClick={togglePlayPause}
          className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/60 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <i
            id="heroPlayPauseIcon"
            className={`ph-bold ${isPlaying ? "ph-pause" : "ph-play"} text-xs`}
          />
          <span id="heroPlayPauseText" className="hidden xs:inline">
            {isPlaying
              ? currentLang === "bn"
                ? "বিরতি"
                : "Pause"
              : currentLang === "bn"
              ? "চালু"
              : "Play"}
          </span>
        </button>

        {/* Mute / Unmute Button (for video slides) */}
        {slide.type === "video" && (
          <button
            type="button"
            id="heroMuteBtn"
            onClick={toggleMute}
            className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/60 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <i
              id="heroMuteIcon"
              className={`ph-bold ${
                isMuted ? "ph-speaker-simple-slash" : "ph-speaker-high text-emerald-400"
              } text-xs`}
            />
            <span id="heroMuteText" className="hidden xs:inline">
              {isMuted
                ? currentLang === "bn"
                  ? "মিউট"
                  : "Muted"
                : currentLang === "bn"
                ? "সাউন্ড"
                : "Audio"}
            </span>
          </button>
        )}

        {/* Next Slide Button */}
        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next Slide"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/60 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-sm"
        >
          <i className="ph-bold ph-caret-right text-xs sm:text-sm" />
        </button>
      </div>
    </section>
  );
};
