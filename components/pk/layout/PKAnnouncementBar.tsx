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
    <div className="relative z-50 bg-primary text-white border-b border-white/10 py-2 px-4 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <span className="inline-flex items-center gap-1.5 bg-accent/30 text-accent-soft px-2 py-0.5 rounded-full text-xs font-semibold border border-accent/40">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Appeal</span>
          </span>
          <p className="text-white/90">
            {t("announcement.message", "Urgent Appeal: Support winter food packages and emergency medical relief across Pakistan districts.")}
          </p>
          <Link
            href="/donate"
            className="underline font-bold text-accent-soft hover:text-white ml-2 transition-colors whitespace-nowrap"
          >
            {t("announcement.action", "Donate Today")} &rarr;
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
