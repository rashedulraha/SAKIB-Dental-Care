"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  DEFAULT_ADMIN_ACCESS_CONFIG,
  type HiddenAdminConfig,
  triggerAdminAccess,
} from "@/lib/auth/adminAccessConfig";

export interface UseSecretTapGestureOptions {
  /**
   * Callback invoked when the multi-tap gesture successfully completes.
   * If omitted, it defaults to dispatching the `triggerAdminAccess({ source: "gesture" })` event.
   */
  onSuccess?: () => void;

  /**
   * Configuration overrides for the tap sequence detection.
   */
  config?: Partial<HiddenAdminConfig>;

  /**
   * Whether the gesture detection is active.
   * @default true
   */
  enabled?: boolean;
}

export function useSecretTapGesture<T extends HTMLElement = HTMLElement>(
  options: UseSecretTapGestureOptions = {}
) {
  const {
    onSuccess,
    config: userConfig,
    enabled = true,
  } = options;

  const config: HiddenAdminConfig = {
    ...DEFAULT_ADMIN_ACCESS_CONFIG,
    ...userConfig,
  };

  const elementRef = useRef<T | null>(null);
  const tapCountRef = useRef<number>(0);
  const lastTapTimeRef = useRef<number>(0);
  const sequenceStartTimeRef = useRef<number>(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetSequence = useCallback(() => {
    tapCountRef.current = 0;
    lastTapTimeRef.current = 0;
    sequenceStartTimeRef.current = 0;
    if (resetTimerRef.current !== null) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const handleTap = useCallback(
    (event?: React.SyntheticEvent | Event) => {
      if (!enabled) return;

      const now = Date.now();

      // Guard against duplicate synthetic events firing within 50ms of the same tap
      if (lastTapTimeRef.current > 0 && now - lastTapTimeRef.current < 50) {
        return;
      }

      // Check if the gap between this tap and the previous tap exceeded maxIntervalMs
      if (
        lastTapTimeRef.current > 0 &&
        now - lastTapTimeRef.current > config.maxIntervalMs
      ) {
        // Gap too long: reset and start new sequence with this tap
        tapCountRef.current = 1;
        sequenceStartTimeRef.current = now;
      } else if (tapCountRef.current === 0) {
        // First tap of a new sequence
        tapCountRef.current = 1;
        sequenceStartTimeRef.current = now;
      } else {
        // Valid consecutive tap within maxIntervalMs
        tapCountRef.current += 1;
      }

      lastTapTimeRef.current = now;

      // Clear existing reset timer
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current);
      }

      // Check if overall sequence timeout exceeded
      if (now - sequenceStartTimeRef.current > config.timeoutMs) {
        resetSequence();
        return;
      }

      // Check if target tap count reached
      if (tapCountRef.current >= config.tapCount) {
        resetSequence();

        // Optional haptic vibration feedback for mobile devices
        if (
          config.enableHaptics &&
          typeof navigator !== "undefined" &&
          typeof navigator.vibrate === "function"
        ) {
          try {
            navigator.vibrate([30, 40, 30]);
          } catch {
            // Ignore browsers where vibration is blocked or unsupported
          }
        }

        if (onSuccess) {
          onSuccess();
        } else {
          triggerAdminAccess({ source: "gesture" });
        }
        return;
      }

      // Set timeout to reset sequence if user stops tapping
      resetTimerRef.current = setTimeout(() => {
        resetSequence();
      }, config.maxIntervalMs);
    },
    [
      enabled,
      config.maxIntervalMs,
      config.timeoutMs,
      config.tapCount,
      config.enableHaptics,
      onSuccess,
      resetSequence,
    ]
  );

  // Reset sequence if the user taps/clicks outside the trigger element
  useEffect(() => {
    if (!enabled) return;

    const handleDocumentPointer = (e: PointerEvent | MouseEvent) => {
      if (!elementRef.current) return;
      if (tapCountRef.current === 0) return;

      const target = e.target as Node | null;
      if (target && !elementRef.current.contains(target)) {
        resetSequence();
      }
    };

    document.addEventListener("pointerdown", handleDocumentPointer, {
      passive: true,
    });

    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointer);
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [enabled, resetSequence]);

  return {
    ref: elementRef,
    handleTap,
    resetSequence,
    currentTapCount: tapCountRef.current,
    triggerProps: {
      ref: elementRef,
      onClick: handleTap,
      style: {
        touchAction: "manipulation",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      } as React.CSSProperties,
      className: "select-none touch-manipulation cursor-default",
    },
  };
}

