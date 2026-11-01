"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

export interface CustomSelectOption<T = string | number> {
  value: T;
  label: string;
  subLabel?: string;
  icon?: string;
  iconColor?: string;
  badge?: string;
  disabled?: boolean;
}

export interface CustomSelectProps<T = string | number> {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  options: CustomSelectOption<T>[];
  placeholder?: string;
  leadingIcon?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
  align?: "left" | "right";
  ariaLabel?: string;
}

export function CustomSelect<T extends string | number>({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  leadingIcon,
  className = "",
  buttonClassName = "",
  menuClassName = "",
  disabled = false,
  align = "left",
  ariaLabel,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (opt: CustomSelectOption<T>) => {
      if (opt.disabled) return;
      onChange(opt.value);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div
      ref={containerRef}
      className={`relative select-container ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`w-full text-left rounded-xl px-3.5 py-3 text-sm font-medium transition-all flex items-center justify-between gap-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen
            ? "border-sky-500 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10"
            : ""
        } ${buttonClassName || "apple-input"}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Leading Icon (from prop or from selected option) */}
          {(selectedOption?.icon || leadingIcon) && (
            <span
              className={`shrink-0 flex items-center justify-center text-base ${
                selectedOption?.iconColor || "text-sky-500 dark:text-sky-400"
              }`}
            >
              <i className={`ph-bold ${selectedOption?.icon || leadingIcon}`} />
            </span>
          )}

          {/* Current Selection Label */}
          <div className="truncate flex-1">
            {selectedOption ? (
              <span className="text-slate-800 dark:text-slate-100 font-semibold block truncate">
                {selectedOption.label}
              </span>
            ) : (
              <span className="text-slate-400 dark:text-slate-500 font-normal">
                {placeholder}
              </span>
            )}
          </div>

          {/* Option Badge if any */}
          {selectedOption?.badge && (
            <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300/50 dark:border-sky-800">
              {selectedOption.badge}
            </span>
          )}
        </div>

        {/* Trailing Chevron */}
        <span
          className={`shrink-0 text-slate-400 dark:text-slate-400 transition-transform duration-200 text-base ${
            isOpen ? "rotate-180 text-sky-500" : ""
          }`}
        >
          <i className="ph-bold ph-caret-down" />
        </span>
      </button>

      {/* Floating Dropdown Menu Panel */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } top-full mt-2 w-full min-w-[240px] max-w-full z-50 rounded-2xl bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl shadow-black/25 overflow-hidden p-1.5 animate-in fade-in-0 zoom-in-95 duration-150 ${menuClassName}`}
        >
          <div className="max-h-64 overflow-y-auto space-y-1 custom-scroll p-0.5">
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={`${String(opt.value)}-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    opt.disabled
                      ? "opacity-40 cursor-not-allowed text-slate-400"
                      : isSelected
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold shadow-md shadow-sky-500/25"
                      : "text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800/80 hover:text-sky-600 dark:hover:text-sky-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {opt.icon && (
                      <span
                        className={`shrink-0 flex items-center justify-center text-base ${
                          isSelected
                            ? "text-white"
                            : opt.iconColor || "text-sky-500 dark:text-sky-400"
                        }`}
                      >
                        <i className={`ph-bold ${opt.icon}`} />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="block truncate">{opt.label}</span>
                      {opt.subLabel && (
                        <span
                          className={`block text-[11px] truncate mt-0.5 ${
                            isSelected
                              ? "text-sky-100"
                              : "text-slate-400 dark:text-slate-400 font-normal"
                          }`}
                        >
                          {opt.subLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Trailing Checkmark or Badge */}
                  <div className="shrink-0 flex items-center gap-2">
                    {opt.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    )}

                    {isSelected && (
                      <i className="ph-bold ph-check text-base text-white animate-in zoom-in-75 duration-100" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

