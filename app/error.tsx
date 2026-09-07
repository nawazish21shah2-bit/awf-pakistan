"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, MessageCircle } from "lucide-react";
import { pkSite } from "@/data/pk/site";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Client Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fafbfc] px-4 py-16">
      <div className="max-w-lg mx-auto text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
            Temporary Loading Issue
          </span>
          <h1 className="text-2xl font-display font-bold text-primary">
            Something went wrong while loading this page
          </h1>
          <p className="text-xs text-muted">
            براہ کرم صفحہ دوبارہ لوڈ کریں یا واٹس ایپ کے ذریعے رابطہ کریں۔
          </p>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Our team has been automatically notified. You can retry loading the page or contact our WhatsApp helpline directly.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold text-xs px-6 py-3 rounded-full shadow-sm transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <a
            href={pkSite.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-3 rounded-full shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp Support</span>
          </a>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link href="/" className="text-xs font-bold text-muted hover:text-primary transition-colors">
            &larr; Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
