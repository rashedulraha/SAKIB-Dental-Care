"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("sdc_admin_lang");
        localStorage.removeItem("sdc_site_lang");
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!password.trim()) {
      setErrorMsg("Please enter the admin password. (অনুগ্রহ করে পাসওয়ার্ড লিখুন)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Direct window redirect ensures cookies and state load fresh
        const params = new URLSearchParams(window.location.search);
        const destination = params.get("callbackUrl") || "/admin";
        window.location.replace(destination);
      } else {
        setErrorMsg(data.message || "Incorrect password! Please try again. (ভুল পাসওয়ার্ড)");
      }
    } catch (err) {
      setErrorMsg("Network error! Please check your connection. (সার্ভার এরর)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] flex items-center justify-center p-4 relative selection:bg-sky-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 max-w-md w-full space-y-6 border border-slate-800 shadow-2xl relative z-10">
        {/* Brand Crest */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 text-2xl">
            <i className="ph-fill ph-shield-check" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin Portal / অ্যাডমিন পোর্টাল
          </h1>
          <p className="text-xs font-medium text-slate-400">
            Sakib Dental Care • সাকিব ডেন্টাল কেয়ার
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-shake">
            <i className="ph-bold ph-warning-circle text-base text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <i className="ph-bold ph-lock-key text-sky-400 text-sm" />
              <span>Admin Password / অ্যাডমিন পাসওয়ার্ড</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                disabled={loading}
                autoFocus
                className="w-full px-4 py-3 rounded-2xl bg-[#030712] border border-slate-700 focus:border-sky-500 outline-none text-white placeholder-slate-500 text-sm font-medium transition-all focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors text-lg"
              >
                <i className={`ph-bold ${showPassword ? "ph-eye-slash" : "ph-eye"}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <i className="ph-bold ph-spinner animate-spin text-lg" />
                <span>Logging In... (যাচাই করা হচ্ছে...)</span>
              </>
            ) : (
              <>
                <span>Enter Dashboard (ড্যাশবোর্ডে প্রবেশ)</span>
                <i className="ph-bold ph-arrow-right" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors"
          >
            <i className="ph-bold ph-arrow-left" />
            <span>Back to Public Website (মূল ওয়েবসাইটে ফিরে যান)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
