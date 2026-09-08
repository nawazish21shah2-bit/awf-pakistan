"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Heart,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const pillars = [
  {
    step: "01",
    icon: Heart,
    title: "100% Zakat Policy",
    subtitle: "Tamleek Guaranteed",
    description:
      "Every single rupee of Zakat is delivered directly to verified deserving (Mustahiq) families with authentic Tamleek (ownership) under strict scholar supervision.",
    badge: "Scholar Supervised",
    features: [
      "Zero overhead deductions from Zakat",
      "Dedicated segregated bank accounts",
      "Authentic Islamic ownership transfer",
    ],
  },
  {
    step: "02",
    icon: CheckCircle2,
    title: "Direct Field Verification",
    subtitle: "No Middlemen",
    description:
      "Our volunteer network personally inspects living conditions, household income, and CNIC records in remote rural union councils before assistance is released.",
    badge: "100% Verified",
    features: [
      "Door-to-door ground assessment",
      "CNIC & biometric validation",
      "Dignity-first aid distribution",
    ],
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "International Governance",
    subtitle: "AWF Canada Backed",
    description:
      "Operated in close alignment with Arrahman Welfare Foundation Canada (CRA #766459077RR0001), ensuring international audit standards and photo reporting.",
    badge: "CRA Aligned",
    features: [
      "Independent annual third-party audits",
      "Transparent multi-currency wire trails",
      "Real-time photographic project proof",
    ],
  },
  {
    step: "04",
    icon: Building2,
    title: "SECP & FBR Compliance",
    subtitle: "Tax Deductible in PK",
    description:
      "Legally registered non-profit organization operating under Pakistani regulations with official NTN donation receipts provided for Pakistani tax residents.",
    badge: "SECP Registered",
    features: [
      "Official NTN tax deduction receipts",
      "Statutory annual filings",
      "Regulated non-profit governance",
    ],
  },
];

export function PKWhyChooseUs() {
  const { t } = useI18n();

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(177,13,19,0.3)]" />
            <span>{t("sections.whyChooseEyebrow", "Trust & Accountability")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">
            {t("sections.whyChooseTitle", "Four Pillars of Transparent Welfare")}
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            We bridge global donor generosity with verified ground execution across Pakistan, guaranteeing that every contribution creates authentic, measurable impact.
          </p>
        </div>

        {/* 4 Pillars Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-2xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Top Number Watermark */}
                <div className="absolute top-4 right-4 text-3xl font-display font-extrabold text-gray-100 group-hover:text-accent/10 transition-colors pointer-events-none">
                  {pillar.step}
                </div>

                <div className="space-y-4 relative z-10">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <span className="text-[11px] font-bold text-accent uppercase tracking-wider block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {pillar.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary/70 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                    {pillar.badge}
                  </span>
                  <Link
                    href="/about"
                    className="text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-accent-deep"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
