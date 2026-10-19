"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { heroSlides } from "@/data/heroSlides";

export const Hero: React.FC = () => {
  const { currentLang, t, quickSelectBranch } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [watermarkFlashed, setWatermarkFlashed] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = heroSlides[currentSlideIndex];

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 7500);
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
      setWatermarkFlashed(true);
      setTimeout(() => setWatermarkFlashed(false), 600);
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
        <span className="block text-xl sm:text-3xl md:text-4xl mt-2 text-sky-300 font-bold">
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
      className="relative w-full min-h-[calc(100vh-78px)] flex items-center justify-center overflow-hidden bg-slate-950 select-none py-12 sm:py-16"
    >
      {/* Background Media Layer (Video + High-Res Slides with Ken-Burns Motion) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Clinical Dental Video Layer */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=85"
          className={`w-full h-full object-cover hero-media-zoom transition-opacity duration-1000 ${
            !isPlaying ? "hero-media-paused" : ""
          } ${slide.type === "video" ? "opacity-90" : "opacity-0"}`}
        >
          <source
            src={
              slide.type === "video"
                ? slide.videoUrl
                : "https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patients-teeth-41677-large.mp4"
            }
            type="video/mp4"
          />
        </video>

        {/* High-Resolution Image Overlay Layer for Slide Transitions & Fallback */}
        <img
          id="heroBackgroundImage"
          src={slide.imageUrl}
          alt="Sakib Dental Care Modern Clinic"
          className={`absolute inset-0 w-full h-full object-cover hero-media-zoom transition-opacity duration-1000 mix-blend-luminosity ${
            !isPlaying ? "hero-media-paused" : ""
          } ${slide.type === "video" ? "opacity-35" : "opacity-85"}`}
        />

        {/* Cinematic Dark Vignette & Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/85 via-[#070d1f]/65 to-[#050914]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(4,8,19,0.78)_100%)]" />
      </div>

      {/* Center Pause/Play Watermark Icon */}
      <div
        id="heroCenterWatermark"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${
          watermarkFlashed ? "opacity-45" : "opacity-15"
        }`}
      >
        <i
          id="heroCenterWatermarkIcon"
          className={`ph-fill ${
            isPlaying ? "ph-pause" : "ph-play"
          } text-white text-5xl sm:text-7xl`}
        />
      </div>

      {/* Centered Hero Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center space-y-5 sm:space-y-6">
        {/* Top Dark Glass Pill Badge with Amber Dot */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0d1527]/85 border border-white/15 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] shrink-0" />
          <span
            id="heroSlideBadge"
            className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-amber-400"
          >
            {badgeText}
          </span>
        </div>

        {/* Main Display Headline */}
        <h1
          id="heroMainTitle"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.12] sm:leading-[1.08] drop-shadow-2xl max-w-4xl"
        >
          {renderTitle()}
        </h1>

        {/* Centered Subtitle Paragraph */}
        <p
          id="heroSlideSubtitle"
          className="text-xs sm:text-base md:text-lg text-slate-200/90 font-medium leading-relaxed max-w-2xl drop-shadow"
        >
          {renderSubtitle()}
        </p>

        {/* Dual Centered Pill CTA Buttons */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-3 w-full xs:w-auto">
          <a
            href="#services"
            className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
          >
            <span>{t("heroPrimaryCta")}</span>
            <i className="ph-bold ph-arrow-right text-base" />
          </a>
          <a
            href="#booking"
            className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/25 backdrop-blur-xl shadow-xl transition-all hover:scale-105"
          >
            <span>{t("heroSecondaryCta")}</span>
          </a>
        </div>

        {/* Compact Quick Branch Schedule Pills under CTAs */}
        <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-200/90">
          <button
            type="button"
            onClick={() => quickSelectBranch("nawhata")}
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-black/45 hover:bg-sky-500/30 border border-white/15 backdrop-blur-md flex items-center gap-1.5 sm:gap-2 transition-all text-left"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span
              dangerouslySetInnerHTML={{
                __html: t("heroPillNawhata"),
              }}
            />
          </button>
          <button
            type="button"
            onClick={() => quickSelectBranch("city")}
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-black/45 hover:bg-indigo-500/30 border border-white/15 backdrop-blur-md flex items-center gap-1.5 sm:gap-2 transition-all text-left"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
            <span
              dangerouslySetInnerHTML={{
                __html: t("heroPillCity"),
              }}
            />
          </button>
        </div>
      </div>

      {/* BOTTOM-LEFT SLIDE COUNTER PILL */}
      <div className="absolute bottom-4 sm:bottom-8 left-3 sm:left-10 z-30 flex items-center gap-2 sm:gap-3">
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0a0f1d]/80 border border-white/15 backdrop-blur-xl text-xs sm:text-sm font-mono font-bold tracking-wider shadow-lg flex items-center gap-1.5">
          <span id="heroSlideCurrentNum" className="text-amber-400">
            {slide.num}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-300">04</span>
        </div>
        <span
          id="heroSlideCaptionTag"
          className="hidden md:inline-block text-xs font-semibold text-slate-300/85 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          {captionText}
        </span>
      </div>

      {/* BOTTOM-RIGHT MEDIA CONTROL CLUSTER */}
      <div className="absolute bottom-4 sm:bottom-8 right-3 sm:right-24 z-30 flex items-center gap-1.5 sm:gap-2">
        {/* Previous Slide Button */}
        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a0f1d]/80 hover:bg-white/20 border border-white/15 backdrop-blur-xl text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg"
        >
          <i className="ph-bold ph-caret-left text-xs sm:text-sm" />
        </button>

        {/* Play / Pause Pill Button */}
        <button
          type="button"
          id="heroPlayPauseBtn"
          onClick={togglePlayPause}
          className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-[#0a0f1d]/80 hover:bg-white/20 border border-white/15 backdrop-blur-xl text-white text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg"
        >
          <i
            id="heroPlayPauseIcon"
            className={`ph-bold ${isPlaying ? "ph-pause" : "ph-play"} text-xs sm:text-sm`}
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

        {/* Mute / Unmute Pill Button */}
        <button
          type="button"
          id="heroMuteBtn"
          onClick={toggleMute}
          className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-[#0a0f1d]/80 hover:bg-white/20 border border-white/15 backdrop-blur-xl text-white text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg"
        >
          <i
            id="heroMuteIcon"
            className={`ph-bold ${
              isMuted ? "ph-speaker-simple-slash" : "ph-speaker-high text-emerald-400"
            } text-xs sm:text-sm`}
          />
          <span id="heroMuteText" className="hidden xs:inline">
            {isMuted
              ? currentLang === "bn"
                ? "মিউট"
                : "Muted"
              : currentLang === "bn"
              ? "সাউন্ড"
              : "Audio On"}
          </span>
        </button>

        {/* Next Slide Button */}
        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Next Slide"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a0f1d]/80 hover:bg-white/20 border border-white/15 backdrop-blur-xl text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg"
        >
          <i className="ph-bold ph-caret-right text-xs sm:text-sm" />
        </button>
      </div>
    </section>
  );
};
