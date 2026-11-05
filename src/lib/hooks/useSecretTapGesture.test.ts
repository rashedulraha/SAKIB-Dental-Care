import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSecretTapGesture } from "@/lib/hooks/useSecretTapGesture";
import { ADMIN_ACCESS_EVENT } from "@/lib/auth/adminAccessConfig";

describe("useSecretTapGesture", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("completes sequence and triggers onSuccess after required consecutive taps", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useSecretTapGesture({
        onSuccess,
        config: { tapCount: 5, maxIntervalMs: 800, timeoutMs: 2500 },
      })
    );

    // Simulate 5 taps with 100ms intervals
    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("dispatches ADMIN_ACCESS_EVENT when onSuccess is omitted", () => {
    const eventSpy = vi.fn();
    window.addEventListener(ADMIN_ACCESS_EVENT, eventSpy);

    const { result } = renderHook(() =>
      useSecretTapGesture({
        config: { tapCount: 5, maxIntervalMs: 800, timeoutMs: 2500 },
      })
    );

    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(eventSpy).toHaveBeenCalledTimes(1);
    window.removeEventListener(ADMIN_ACCESS_EVENT, eventSpy);
  });

  it("does not trigger onSuccess if tap count is less than required", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useSecretTapGesture({
        onSuccess,
        config: { tapCount: 5, maxIntervalMs: 800, timeoutMs: 2500 },
      })
    );

    for (let i = 0; i < 4; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("resets sequence when interval between taps exceeds maxIntervalMs", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useSecretTapGesture({
        onSuccess,
        config: { tapCount: 5, maxIntervalMs: 500, timeoutMs: 3000 },
      })
    );

    // 3 taps
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    // Wait longer than maxIntervalMs (e.g. 600ms)
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Tap 2 more times (total is now 2, not 5, because sequence was reset)
    for (let i = 0; i < 2; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("resets sequence when clicking outside the trigger element", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useSecretTapGesture({
        onSuccess,
        config: { tapCount: 5, maxIntervalMs: 800, timeoutMs: 2500 },
      })
    );

    const triggerEl = document.createElement("div");
    const outsideEl = document.createElement("div");
    document.body.appendChild(triggerEl);
    document.body.appendChild(outsideEl);
    result.current.ref.current = triggerEl;

    // 3 taps on trigger
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    // Pointer down outside
    act(() => {
      outsideEl.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    });

    // 2 more taps on trigger
    for (let i = 0; i < 2; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(onSuccess).not.toHaveBeenCalled();

    document.body.removeChild(triggerEl);
    document.body.removeChild(outsideEl);
  });

  it("calls navigator.vibrate on mobile if haptics enabled", () => {
    const vibrateSpy = vi.fn();
    Object.defineProperty(navigator, "vibrate", {
      value: vibrateSpy,
      configurable: true,
      writable: true,
    });

    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useSecretTapGesture({
        onSuccess,
        config: { tapCount: 3, enableHaptics: true },
      })
    );

    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(vibrateSpy).toHaveBeenCalledWith([30, 40, 30]);
  });

  it("ignores taps when enabled is false", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useSecretTapGesture({
        onSuccess,
        enabled: false,
        config: { tapCount: 3 },
      })
    );

    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        result.current.handleTap();
      });
    }

    expect(onSuccess).not.toHaveBeenCalled();
  });
});

