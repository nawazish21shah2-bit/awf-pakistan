"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

export function PKLocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/20 backdrop-blur-md transition-colors",
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200",
          locale === "en"
            ? "bg-accent text-white shadow-sm"
            : "text-white/80 hover:text-white"
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ur")}
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-full font-urdu transition-all duration-200",
          locale === "ur"
            ? "bg-accent text-white shadow-sm"
            : "text-white/80 hover:text-white"
        )}
        aria-pressed={locale === "ur"}
      >
        اردو
      </button>
    </div>
  );
}
