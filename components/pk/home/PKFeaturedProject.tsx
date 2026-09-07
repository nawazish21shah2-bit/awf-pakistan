"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { featuredProject } from "@/data/pk/home";
import { useI18n } from "@/lib/i18n/context";

export function PKFeaturedProject() {
  const { t } = useI18n();

  return (
    <section className="py-16 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80">
          
          {/* Card Header Info */}
          <div className="p-6 sm:px-10 sm:pt-8 pb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("sections.featuredEyebrow", "Featured Initiative")}</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted px-2 py-1 bg-gray-100 rounded-md">
                {featuredProject.category}
              </span>
            </div>
            <span className="text-xs font-semibold text-accent flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-accent" /> 100% Zakat Eligible
            </span>
          </div>

          {/* Image Showcase */}
          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-slate-950 overflow-hidden">
            <Image
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Text & CTA Section Below */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                {featuredProject.title}
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {featuredProject.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-2">
              {/* Static Progress Bar for Raised So Far */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-bold text-primary">
                  <span>Raised: <span className="text-accent">{featuredProject.raisedAmount}</span></span>
                  <span className="text-muted">Goal: {featuredProject.goalAmount}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-1000"
                    style={{ width: `${featuredProject.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-muted">
                  {featuredProject.progressPercent}% of target reached across target districts in Punjab & Sindh.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/donate?project=new-beginnings-program"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3.5 rounded-full shadow-glow transition-all hover:scale-105 active:scale-95 text-sm"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Sponsor a Wedding Kit</span>
                </Link>

                <Link
                  href={featuredProject.href}
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-primary font-semibold px-6 py-3.5 rounded-full transition-colors text-sm"
                >
                  <span>Read Full Case Study</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
