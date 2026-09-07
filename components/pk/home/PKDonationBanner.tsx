"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Heart, ShieldCheck } from "lucide-react";
import { pkSite } from "@/data/pk/site";
import { useI18n } from "@/lib/i18n/context";

export function PKDonationBanner() {
  const { t } = useI18n();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-soft to-primary text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-accent-soft px-3 py-1 rounded-full text-xs font-bold border border-white/20">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("sections.zakatNoticeTitle", "100% Zakat Policy")}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
              Fulfil Your Zakat & Sadaqah Where It Matters Most
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {t(
                "sections.zakatNoticeText",
                "Your Zakat is delivered directly to verified deserving families and students in full compliance with Islamic principles."
              )}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-7 py-3.5 rounded-full shadow-glow transition-transform hover:scale-105 active:scale-95 text-sm"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Calculate & Donate Now</span>
              </Link>

              <a
                href={pkSite.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Confirmation</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
