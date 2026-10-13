"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, CheckCircle2 } from "lucide-react";
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
          <div className="relative w-full aspect-[16/9] max-h-[440px] bg-gray-900 overflow-hidden">
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

            {/* Key Points */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Complete wedding essentials for brides</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Dignity-focused collective ceremonies</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>100% Zakat-eligible support</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/donate?project=new-beginnings-program"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3.5 rounded-full shadow-glow transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Sponsor a Wedding Kit</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
