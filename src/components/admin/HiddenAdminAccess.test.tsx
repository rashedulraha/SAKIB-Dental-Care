import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { HiddenAdminAccess } from "@/components/admin/HiddenAdminAccess";
import { ADMIN_ACCESS_EVENT } from "@/lib/auth/adminAccessConfig";

describe("HiddenAdminAccess", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    document.body.style.overflow = "";
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("is not visible by default", () => {
    render(<HiddenAdminAccess />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens modal when pressing ESC key on desktop", () => {
    render(<HiddenAdminAccess />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Admin Sign In" })).toBeInTheDocument();
  });

  it("does not open modal on ESC if user is typing in an input element", () => {
    render(
      <div>
        <input data-testid="test-input" />
        <HiddenAdminAccess />
      </div>
    );

    const input = screen.getByTestId("test-input");
    input.focus();

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Escape", bubbles: true });
      input.dispatchEvent(event);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not open modal on ESC if user is typing in a textarea element", () => {
    render(
      <div>
        <textarea data-testid="test-textarea" />
        <HiddenAdminAccess />
      </div>
    );

    const textarea = screen.getByTestId("test-textarea");
    textarea.focus();

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Escape", bubbles: true });
      textarea.dispatchEvent(event);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not open modal on ESC if user is interacting with a select element", () => {
    render(
      <div>
        <select data-testid="test-select">
          <option value="1">Option 1</option>
        </select>
        <HiddenAdminAccess />
      </div>
    );

    const select = screen.getByTestId("test-select");
    select.focus();

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Escape", bubbles: true });
      select.dispatchEvent(event);
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not open modal on ESC if another modal dialog is already open", () => {
    const existingModal = document.createElement("div");
    existingModal.setAttribute("role", "dialog");
    existingModal.id = "other-modal";
    document.body.appendChild(existingModal);

    render(<HiddenAdminAccess />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(screen.queryByRole("heading", { name: "Admin Sign In" })).toBeNull();
  });

  it("does not open modal on ESC if mobile menu is open", () => {
    const mobileMenu = document.createElement("div");
    mobileMenu.setAttribute("data-mobile-menu-open", "true");
    document.body.appendChild(mobileMenu);

    render(<HiddenAdminAccess />);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes modal when pressing ESC while modal is open", () => {
    render(<HiddenAdminAccess />);

    // Open via ESC
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close via ESC
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens modal when custom ADMIN_ACCESS_EVENT is dispatched (e.g. from secret multi-tap)", () => {
    render(<HiddenAdminAccess />);

    act(() => {
      window.dispatchEvent(new CustomEvent(ADMIN_ACCESS_EVENT, { detail: { source: "gesture" } }));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes modal when clicking the backdrop overlay", () => {
    render(<HiddenAdminAccess />);

    act(() => {
      window.dispatchEvent(new CustomEvent(ADMIN_ACCESS_EVENT));
    });

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // Click backdrop (dialog container element itself)
    fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes modal when clicking the Cancel button", () => {
    render(<HiddenAdminAccess />);

    act(() => {
      window.dispatchEvent(new CustomEvent(ADMIN_ACCESS_EVENT));
    });

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("locks and restores document.body.style.overflow", () => {
    render(<HiddenAdminAccess />);
    expect(document.body.style.overflow).toBe("");

    act(() => {
      window.dispatchEvent(new CustomEvent(ADMIN_ACCESS_EVENT));
    });
    expect(document.body.style.overflow).toBe("hidden");

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(document.body.style.overflow).toBe("");
  });

  it("restores previous focus when closed", () => {
    render(
      <div>
        <button data-testid="outside-button">Trigger Button</button>
        <HiddenAdminAccess />
      </div>
    );

    const outsideButton = screen.getByTestId("outside-button");
    outsideButton.focus();
    expect(document.activeElement).toBe(outsideButton);

    act(() => {
      window.dispatchEvent(new CustomEvent(ADMIN_ACCESS_EVENT));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(outsideButton);
  });
});
