import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AdminAuthForm } from "@/components/admin/AdminAuthForm";

describe("AdminAuthForm", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location.replace
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, replace: vi.fn() },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it("renders email, password, and submit controls", () => {
    render(<AdminAuthForm />);

    expect(screen.getByRole("heading", { name: "Admin Sign In" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In to Dashboard" })).toBeInTheDocument();
  });

  it("toggles password visibility when eye icon is clicked", () => {
    render(<AdminAuthForm />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", { name: "Show password" });
    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide password" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls onCancel when cancel button or close button is clicked", () => {
    const onCancel = vi.fn();
    render(<AdminAuthForm onCancel={onCancel} cancelLabel="Cancel" />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);

    const closeButton = screen.getByRole("button", { name: "Close admin sign in modal" });
    fireEvent.click(closeButton);
    expect(onCancel).toHaveBeenCalledTimes(2);
  });

  it("handles successful login and redirects to /dashboard", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Admin sign-in successful." }),
    });
    global.fetch = fetchMock;

    render(<AdminAuthForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "sakibdentalcare1@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "SakibDental@2026" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In to Dashboard" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/auth/login", expect.any(Object));
      expect(window.location.replace).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("displays server error alert on invalid credentials", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: "Invalid email or password." }),
    });
    global.fetch = fetchMock;

    render(<AdminAuthForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "WrongPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In to Dashboard" }));

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Invalid email or password.");
    });
  });

  it("displays network error alert when fetch fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Network failed"));
    global.fetch = fetchMock;

    render(<AdminAuthForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In to Dashboard" }));

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("A network error occurred. Please try again.");
    });
  });
});

