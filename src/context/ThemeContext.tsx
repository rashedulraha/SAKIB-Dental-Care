"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
    const isDarkStored = localStorage.getItem("sdc_theme") === "dark";
    if (isDarkStored) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("sdc_theme", "dark");
        showToast("VisionOS Dark Glass", "Switched to Apple VisionOS Dark Frosted Glass.");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("sdc_theme", "light");
        showToast("Daylight Frosted Glass", "Switched to Apple Daylight Frosted Glass.");
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
