"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useClinic } from "@/context/ClinicContext";
import { heroSlides } from "@/data/heroSlides";
import type { HeroSlide } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Constants & small helpers                                                  */
/* -------------------------------------------------------------------------- */

type LangMode = "en" | "bn" | "both";

const TOTAL = heroSlides.length;
const SWIPE_DISTANCE = 48; // px

interface UiStrings {
  region: string;
  branches: string;
  slideOf: (n: number, total: number) => string;
  goTo: (n: number) => string;
  prev: string;
  next: string;
  pause: string;
  play: string;
  soundOn: string;
  soundOff: string;
}

const UI: Record<"en" | "bn", UiStrings> = {
  en: {
    region: "Sakib Dental Care highlights",
    branches: "Our branches",
    slideOf: (n, total) => `Slide ${n} of ${total}`,
    goTo: (n) => `Go to slide ${n}`,
    prev: "Previous slide",
    next: "Next slide",
    pause: "Pause slideshow",
    play: "Play slideshow",
    soundOn: "Turn sound on",
    soundOff: "Mute sound",
  },
  bn: {
    region: "সাকিব ডেন্টাল কেয়ার — হাইলাইটস",
    branches: "আমাদের শাখা",
    slideOf: (n, total) => `স্লাইড ${n}/${total}`,
    goTo: (n) => `স্লাইড ${n}-এ যান`,
    prev: "আগের স্লাইড",
    next: "পরের স্লাইড",
    pause: "স্লাইডশো থামান",
    play: "স্লাইডশো চালু করুন",
    soundOn: "সাউন্ড চালু করুন",
    soundOff: "সাউন্ড বন্ধ করুন",
  },
};

const toMode = (lang: string): LangMode =>
  lang === "en" || lang === "bn" ? lang : "both";

const isKeyboardFocus = (el: Element): boolean => {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true; // পুরনো ব্রাউজারে নিরাপদ দিকটাই বেছে নেওয়া (পজ)
  }
};

/* -------------------------------------------------------------------------- */
/*  Presentational pieces                                                      */
/* -------------------------------------------------------------------------- */

interface BilingualProps {
  en: string;
  bn: string;
  mode: LangMode;
  secondaryClassName: string;
}

/** en / bn এক ভাষা দেখায়; "both" মোডে ইংরেজি মূল, বাংলা গৌণ লাইন হিসেবে। */
const Bilingual: React.FC<BilingualProps> = ({
  en,
  bn,
  mode,
  secondaryClassName,
}) => {
  if (mode === "en") return <>{en}</>;
  if (mode === "bn") return <>{bn}</>;
  return (
    <>
      {en}
      <span lang="bn" className={secondaryClassName}>
        {bn}
      </span>
    </>
  );
};

interface SlideCopyProps {
  slide: HeroSlide;
  position: number;
  active: boolean;
  mode: LangMode;
  label: string;
}

const SlideCopy: React.FC<SlideCopyProps> = ({
  slide,
  position,
  active,
  mode,
  label,
}) => {
  // পেজে একটিই h1 থাকবে (প্রথম স্লাইড); বাকিগুলো h2।
  const Heading = position === 0 ? "h1" : "h2";
  const lang = mode === "bn" ? "bn" : "en";

  return (
    <div
      className="hero-slide"
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      aria-hidden={!active}
      data-active={active}>
      <p className="hero-badge">
        <i className="ph-fill ph-shield-check" aria-hidden="true" />
        <span lang={lang}>{mode === "bn" ? slide.badgeBn : slide.badgeEn}</span>
      </p>

      <Heading className="hero-title" lang={lang}>
        <Bilingual
          en={slide.titleEn}
          bn={slide.titleBn}
          mode={mode}
          secondaryClassName="hero-title-bn"
        />
      </Heading>

      <p className="hero-sub" lang={lang}>
        <Bilingual
          en={slide.subEn}
          bn={slide.subBn}
          mode={mode}
          secondaryClassName="hero-sub-bn"
        />
      </p>
    </div>
  );
};

interface IconButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  concealed?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  concealed = false,
}) => (
  <button
    type="button"
    className="hero-iconbtn"
    onClick={onClick}
    aria-label={label}
    title={label}
    data-concealed={concealed || undefined}
    tabIndex={concealed ? -1 : undefined}>
    <i className={`ph-bold ${icon}`} aria-hidden="true" />
  </button>
);

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const Hero: React.FC = () => {
  const { currentLang, t, quickSelectBranch } = useLanguage();
  const { nawhataHours, cityHours, nawhataName, cityName } = useClinic();

  const mode = toMode(currentLang);
  const ui = mode === "bn" ? UI.bn : UI.en;

  // index = বর্তমান স্লাইড, prev = ক্রসফেডের জন্য সদ্য ছেড়ে আসা স্লাইড
  const [{ index, prev }, setPosition] = useState({ index: 0, prev: -1 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const slide = heroSlides[index];
  const isVideoSlide = slide.type === "video" && Boolean(slide.videoUrl);
  const isPaused = !isPlaying || isHovered || hasKeyboardFocus;

  /* ---- Navigation ------------------------------------------------------- */

  const goTo = useCallback(
    (next: number) =>
      setPosition((p) =>
        p.index === next ? p : { index: next, prev: p.index },
      ),
    [],
  );
  const goNext = useCallback(
    () => setPosition((p) => ({ index: (p.index + 1) % TOTAL, prev: p.index })),
    [],
  );
  const goPrev = useCallback(
    () =>
      setPosition((p) => ({
        index: (p.index - 1 + TOTAL) % TOTAL,
        prev: p.index,
      })),
    [],
  );

  /* ---- Effects ---------------------------------------------------------- */

  // Reduced-motion ব্যবহারকারীর জন্য অটো-প্লে বন্ধ দিয়ে শুরু
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsPlaying(false);
    }
  }, []);

  // পরের স্লাইডের ছবি আগেই ক্যাশে আনা
  useEffect(() => {
    const img = new Image();
    img.src = heroSlides[(index + 1) % TOTAL].imageUrl;
  }, [index]);

  // ভিডিও: শুধু সক্রিয় স্লাইডেরটি চলবে; বাকিগুলো থামানো
  useEffect(() => {
    const active = videoRef.current;
    frameRef.current?.querySelectorAll("video").forEach((v) => {
      if (v !== active) v.pause();
    });
    if (!active) return;
    active.muted = isMuted;
    if (isPlaying) {
      active.play().catch(() => {});
    } else {
      active.pause();
    }
  }, [index, isPlaying, isMuted]);

  /* ---- Interaction handlers --------------------------------------------- */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") goNext();
    else if (e.key === "ArrowLeft") goPrev();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  /* ---- Derived content -------------------------------------------------- */

  const caption =
    mode === "en"
      ? slide.captionEn
      : mode === "bn"
        ? slide.captionBn
        : `${slide.captionEn} • ${slide.captionBn}`;

  const branches = [
    { id: "nawhata", name: nawhataName, hours: nawhataHours },
    { id: "city", name: cityName, hours: cityHours },
  ] as const;

  /* ---- Render ----------------------------------------------------------- */

  return (
    <section
      id="hero"
      className="hero-section"
      aria-roledescription="carousel"
      aria-label={ui.region}
      data-paused={isPaused}
      onKeyDown={handleKeyDown}>
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-inner">
        {/* ============================ COPY ============================ */}
        <div className="hero-copy">
          <div
            className="hero-copy-stack"
            aria-live={isPlaying ? "off" : "polite"}
            aria-atomic="true">
            {heroSlides.map((s, i) => (
              <SlideCopy
                key={s.num}
                slide={s}
                position={i}
                active={i === index}
                mode={mode}
                label={ui.slideOf(i + 1, TOTAL)}
              />
            ))}
          </div>

          <div className="hero-actions">
            <a href="#services" className="hero-btn hero-btn-primary">
              <span>{t("heroPrimaryCta")}</span>
              <i
                className="ph-bold ph-arrow-right hero-btn-arrow"
                aria-hidden="true"
              />
            </a>
            <a href="#booking" className="hero-btn hero-btn-ghost">
              <i className="ph-fill ph-calendar-plus" aria-hidden="true" />
              <span>{t("heroSecondaryCta")}</span>
            </a>
          </div>

          <div className="hero-branches" role="group" aria-label={ui.branches}>
            {branches.map((b) => (
              <button
                key={b.id}
                type="button"
                className="hero-branch"
                onClick={() => quickSelectBranch(b.id)}>
                <span className="hero-branch-icon">
                  <i className="ph-fill ph-map-pin" aria-hidden="true" />
                </span>
                <span className="hero-branch-text">
                  <span className="hero-branch-name">{b.name}</span>
                  <span className="hero-branch-hours">{b.hours}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================ STAGE =========================== */}
        <div
          className="hero-stage"
          onPointerEnter={(e) =>
            e.pointerType === "mouse" && setIsHovered(true)
          }
          onPointerLeave={() => setIsHovered(false)}
          onFocus={(e) => setHasKeyboardFocus(isKeyboardFocus(e.target))}
          onBlur={() => setHasKeyboardFocus(false)}>
          <div
            ref={frameRef}
            className="hero-frame"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => (swipeStart.current = null)}>
            {/* শুধু সক্রিয় ও সদ্য-ছেড়ে-আসা স্লাইডের মিডিয়া মাউন্ট থাকে */}
            {heroSlides.map((s, i) => {
              if (i !== index && i !== prev) return null;
              const active = i === index;
              const zoom = `hero-media-zoom${isPlaying ? "" : " hero-media-paused"}`;
              return (
                <React.Fragment key={s.num}>
                  <img
                    className={`hero-layer ${zoom}`}
                    data-active={active}
                    src={s.imageUrl}
                    alt=""
                    decoding="async"
                    draggable={false}
                  />
                  {s.type === "video" && s.videoUrl && (
                    <video
                      ref={active ? videoRef : undefined}
                      className={`hero-layer hero-layer-video ${zoom}`}
                      data-current={active}
                      src={s.videoUrl}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex={-1}
                      onLoadedData={(e) =>
                        e.currentTarget.setAttribute("data-ready", "true")
                      }
                    />
                  )}
                </React.Fragment>
              );
            })}

            <div
              key={`flash-${slide.num}`}
              className="hero-flash"
              aria-hidden="true"
            />
            <p key={`label-${slide.num}`} className="hero-label">
              {caption}
            </p>
          </div>

          <div className="hero-dock">
            <div className="hero-segs" role="group" aria-label={ui.region}>
              {heroSlides.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  className="hero-seg"
                  data-state={
                    i < index ? "done" : i === index ? "active" : "idle"
                  }
                  aria-label={ui.goTo(i + 1)}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}>
                  <span className="hero-seg-track">
                    <span
                      className="hero-seg-fill"
                      onAnimationEnd={i === index ? goNext : undefined}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="hero-dock-row">
              <p className="hero-counter" aria-hidden="true">
                <span>{slide.num}</span>
                <span>/</span>
                <span>{String(TOTAL).padStart(2, "0")}</span>
              </p>

              <div className="hero-controls">
                {/* সবার আগে রাখা: ছবির স্লাইডে লুকালে গুচ্ছের মাঝখানে ফাঁক পড়ে না */}
                <IconButton
                  icon={isMuted ? "ph-speaker-simple-slash" : "ph-speaker-high"}
                  label={isMuted ? ui.soundOn : ui.soundOff}
                  onClick={() => setIsMuted((v) => !v)}
                  concealed={!isVideoSlide}
                />
                <IconButton
                  icon="ph-caret-left"
                  label={ui.prev}
                  onClick={goPrev}
                />
                <IconButton
                  icon={isPlaying ? "ph-pause" : "ph-play"}
                  label={isPlaying ? ui.pause : ui.play}
                  onClick={() => setIsPlaying((v) => !v)}
                />
                <IconButton
                  icon="ph-caret-right"
                  label={ui.next}
                  onClick={goNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
