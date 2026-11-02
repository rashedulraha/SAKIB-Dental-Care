"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type LangMode = "dual" | "en" | "bn";

interface AdminContextType {
  adminLang: LangMode;
  setAdminLang: (lang: LangMode) => void;
  L: (en: string, bn: string) => string;
  pendingCount: number;
  totalCount: number;
  refreshStats: () => Promise<void>;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isLogoutModalOpen: boolean;
  isLoggingOut: boolean;
  logoutError: string;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  confirmLogout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminLang, setAdminLangState] = useState<LangMode>("en");
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState("");

  // Clean up legacy localStorage keys to ensure zero junk storage
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

  const setAdminLang = (lang: LangMode) => {
    setAdminLangState(lang);
  };

  const openLogoutModal = useCallback(() => {
    setIsLogoutModalOpen(true);
  }, []);

  const closeLogoutModal = useCallback(() => {
    if (!isLoggingOut) {
      setIsLogoutModalOpen(false);
      setLogoutError("");
    }
  }, [isLoggingOut]);

  const confirmLogout = useCallback(async () => {
    setLogoutError("");
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Logout request failed with status ${response.status}.`);
      }

      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem("sdc_admin_lang");
          localStorage.removeItem("sdc_site_lang");
        }
      } catch {
        console.error("Unable to clear saved admin display preferences.");
      }
      window.location.replace("/");
    } catch (error) {
      console.error("Logout request failed:", error);
      setLogoutError("Logout failed. Check your connection and try again.");
      setIsLoggingOut(false);
    }
  }, []);

  const L = useCallback(
    (en: string, bn: string): string => {
      if (adminLang === "en") return en;
      if (adminLang === "bn") return bn;
      return `${en} / ${bn}`;
    },
    [adminLang]
  );

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        setTotalCount(data.data.length);
        const pending = data.data.filter((a: any) => a.status === "PENDING").length;
        setPendingCount(pending);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AdminContext.Provider
      value={{
        adminLang,
        setAdminLang,
        L,
        pendingCount,
        totalCount,
        refreshStats,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        isLogoutModalOpen,
        isLoggingOut,
        logoutError,
        openLogoutModal,
        closeLogoutModal,
        confirmLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
