"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastContextType {
  toast: { title: string; message: string; visible: boolean };
  showToast: (title: string, message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState({
    title: "",
    message: "",
    visible: false,
  });

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const showToast = useCallback(
    (title: string, message: string) => {
      setToast({ title, message, visible: true });
      setTimeout(() => {
        hideToast();
      }, 3500);
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
