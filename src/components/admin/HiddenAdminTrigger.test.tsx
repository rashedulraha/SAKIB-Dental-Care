import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { HiddenAdminTrigger } from "@/components/admin/HiddenAdminTrigger";
import { ADMIN_ACCESS_EVENT } from "@/lib/auth/adminAccessConfig";

describe("HiddenAdminTrigger", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders children identically to standard text without button styling", () => {
    const { container } = render(
      <HiddenAdminTrigger as="p" className="text-sm text-slate-500">
        © 2026 Sakib Dental Care. All Rights Reserved.
      </HiddenAdminTrigger>
    );

    const paragraph = screen.getByText("© 2026 Sakib Dental Care. All Rights Reserved.");
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("select-none");
    expect(paragraph).toHaveClass("touch-manipulation");
    expect(paragraph).toHaveClass("cursor-default");
    expect(container.querySelector("button")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
  });

  it("triggers secret access event on 5 consecutive taps", () => {
    const eventSpy = vi.fn();
    window.addEventListener(ADMIN_ACCESS_EVENT, eventSpy);

    render(
      <HiddenAdminTrigger as="p">
        Trigger Text
      </HiddenAdminTrigger>
    );

    const triggerEl = screen.getByText("Trigger Text");

    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        fireEvent.click(triggerEl);
      });
    }

    expect(eventSpy).toHaveBeenCalledTimes(1);
    window.removeEventListener(ADMIN_ACCESS_EVENT, eventSpy);
  });

  it("calls custom onSuccess when provided", () => {
    const onSuccess = vi.fn();

    render(
      <HiddenAdminTrigger as="div" onSuccess={onSuccess}>
        Trigger Box
      </HiddenAdminTrigger>
    );

    const triggerEl = screen.getByText("Trigger Box");

    for (let i = 0; i < 5; i++) {
      act(() => {
        vi.advanceTimersByTime(100);
        fireEvent.click(triggerEl);
      });
    }

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});

