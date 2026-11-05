"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { AdminAuthForm } from "@/components/admin/AdminAuthForm";
import {
  ADMIN_ACCESS_EVENT,
  type AdminAccessEventDetail,
} from "@/lib/auth/adminAccessConfig";

function isEditableElement(element: EventTarget | null): boolean {
  if (!element || !(element instanceof HTMLElement)) return false;
  const tagName = element.tagName.toUpperCase();
  if (
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  ) {
    return true;
  }
  if (element.isContentEditable) {
    return true;
  }
  return false;
}

function isAnotherModalOpen(): boolean {
  if (typeof document === "undefined") return false;

  // Check for any visible dialogs or modals other than our admin modal
  const otherDialogs = document.querySelectorAll<HTMLElement>(
    'dialog[open], [role="dialog"]:not(#admin-access-modal), [aria-modal="true"]:not(#admin-access-modal), #serviceModal'
  );

  for (const el of Array.from(otherDialogs)) {
    if (el.style.display !== "none" && el.style.visibility !== "hidden") {
      return true;
    }
  }

  // Check if mobile menu in Header is open
  const openMobileMenu = document.querySelector('[data-mobile-menu-open="true"]');
  if (openMobileMenu) return true;

  // Check if any custom select dropdown or combobox is open
  const expandedDropdown = document.querySelector('[aria-expanded="true"]');
  if (expandedDropdown) return true;

  return false;
}

export function HiddenAdminAccess() {
  const [isOpen, setIsOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback(() => {
    setIsOpen((alreadyOpen) => {
      if (alreadyOpen) return true;
      if (typeof document !== "undefined") {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
      }
      return true;
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen for custom trigger events dispatched by secret gestures
  useEffect(() => {
    const handleAdminAccessEvent = (event: Event) => {
      openModal();
    };

    window.addEventListener(ADMIN_ACCESS_EVENT, handleAdminAccessEvent);
    return () => {
      window.removeEventListener(ADMIN_ACCESS_EVENT, handleAdminAccessEvent);
    };
  }, [openModal]);

  // Handle Desktop ESC keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      if (event.key === "Escape" || event.code === "Escape") {
        if (isOpen) {
          // If admin modal is open, ESC closes it cleanly
          event.preventDefault();
          event.stopPropagation();
          closeModal();
          return;
        }

        // If typing inside an input/textarea/select, do NOT trigger admin modal
        if (
          isEditableElement(event.target) ||
          isEditableElement(document.activeElement)
        ) {
          return;
        }

        // If another modal, drawer, or dropdown is open, let that element handle ESC
        if (isAnotherModalOpen()) {
          return;
        }

        // All checks passed: open the hidden admin login modal
        event.preventDefault();
        openModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, openModal, closeModal]);

  // Handle scroll-lock, focus restoration, and initial focus trap
  useEffect(() => {
    if (!isOpen) {
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus initial input inside modal
    const focusTimer = setTimeout(() => {
      if (!modalContainerRef.current) return;
      const initialFocusable = modalContainerRef.current.querySelector<HTMLElement>(
        'input[type="email"], input:not([type="hidden"]):not([disabled]), button:not([disabled])'
      );
      initialFocusable?.focus();
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Handle Tab key focus trap inside the open modal
  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !modalContainerRef.current) return;

    const focusable = modalContainerRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="admin-access-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-auth-title"
      aria-describedby="admin-auth-desc"
      ref={modalContainerRef}
      onKeyDown={handleModalKeyDown}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto transition-all"
      onClick={(event) => {
        // Close on clicking backdrop
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="w-full max-w-md my-auto animate-in fade-in zoom-in-95 duration-200">
        <AdminAuthForm onCancel={closeModal} cancelLabel="Cancel" />
      </div>
    </div>
  );
}
