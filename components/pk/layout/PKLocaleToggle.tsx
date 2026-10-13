"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

export function PKLocaleToggle({
  className,
  scrolled = false,
}: {
  className?: string;
  scrolled?: boolean;
}) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-0.5 border backdrop-blur-md transition-all duration-200",
        scrolled
          ? "bg-gray-100/90 border-gray-300 text-gray-700 shadow-xs"
          : "bg-white/10 border-white/20 text-white shadow-xs",
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer",
          locale === "en"
            ? "bg-accent text-white shadow-sm"
            : scrolled
              ? "text-gray-700 hover:text-gray-900 hover:bg-gray-200/60"
              : "text-white/80 hover:text-white hover:bg-white/10"
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ur")}
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-full font-urdu transition-all duration-200 cursor-pointer",
          locale === "ur"
            ? "bg-accent text-white shadow-sm"
            : scrolled
              ? "text-gray-700 hover:text-gray-900 hover:bg-gray-200/60"
              : "text-white/80 hover:text-white hover:bg-white/10"
        )}
        aria-pressed={locale === "ur"}
      >
        اردو
      </button>
    </div>
  );
}
