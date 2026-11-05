"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

interface ApiResponse {
  success: boolean;
  message: string;
}

export interface AdminAuthFormProps {
  onCancel?: () => void;
  cancelLabel?: string;
}

export function AdminAuthForm({ onCancel, cancelLabel = "Cancel" }: AdminAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid email or password.");
        return;
      }

      // Successful login -> Redirect directly to dashboard
      window.location.replace("/dashboard");
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-[#0f172a] p-5 sm:p-8 shadow-2xl">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Close admin sign in modal"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-800/40 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
        >
          <i className="ph ph-x text-base" aria-hidden="true" />
        </button>
      )}

      <header className="mb-6 space-y-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl text-white shadow-lg shadow-sky-500/25">
          <i className="ph-fill ph-shield-check" aria-hidden="true" />
        </div>
        <h2 id="admin-auth-title" className="text-xl font-extrabold tracking-tight text-white">
          Admin Sign In
        </h2>
        <p id="admin-auth-desc" className="text-xs font-medium text-slate-400">
          Enter your admin email and password to access the dashboard.
        </p>
      </header>

      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/15 p-3 text-sm text-rose-300"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="admin-email" className="text-xs font-bold text-slate-200">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="sakibdentalcare1@gmail.com"
            autoComplete="username"
            maxLength={254}
            required
            disabled={isSubmitting}
            autoFocus
            className="w-full rounded-xl border border-slate-700 bg-[#030712] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="admin-password" className="text-xs font-bold text-slate-200">
            Password
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              maxLength={1024}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-700 bg-[#030712] px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isSubmitting}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition hover:text-slate-200 disabled:opacity-50"
            >
              <i
                className={`ph ${showPassword ? "ph-eye-slash" : "ph-eye"} text-lg`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-600 hover:to-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <i className="ph ph-spinner animate-spin text-lg" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-xs font-semibold text-slate-400 transition hover:text-white disabled:opacity-50"
          >
            {cancelLabel}
          </button>
        ) : (
          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 transition hover:text-sky-400"
          >
            Back to website
          </Link>
        )}
        <span className="text-[11px] text-slate-500">Sakib Dental Care</span>
      </div>
    </section>
  );
}
