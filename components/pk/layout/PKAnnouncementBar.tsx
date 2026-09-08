"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, HeartHandshake } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function PKAnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useI18n();

  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-primary text-white border-b border-white/10 py-2 sm:py-2.5 px-3 sm:px-4 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center text-center gap-1.5 sm:gap-2.5 pe-7 sm:pe-0">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 leading-relaxed">
            <span className="inline-flex items-center gap-1 bg-accent text-white px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-sm shrink-0">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{t("announcement.badge", "Appeal")}</span>
            </span>
            <span className="text-white/90 font-medium">
              {t("announcement.message", "Urgent Appeal: Support winter food packages and emergency medical relief across Pakistan districts.")}
            </span>
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 font-bold text-white bg-accent hover:bg-accent-deep sm:bg-transparent sm:hover:bg-transparent sm:text-red-300 sm:hover:text-white px-3 py-1 sm:py-0 sm:px-0 rounded-full sm:rounded-none sm:underline sm:underline-offset-2 transition-all shrink-0 text-xs shadow-xs sm:shadow-none"
            >
              <span>{t("announcement.action", "Donate Today")}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute end-2 top-2 sm:static text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
