"use client";

import React from "react";
import { MapPin, Users, HeartHandshake, Award } from "lucide-react";
import type { AchievementCounter } from "@/types/cms";
import { fallbackImpactStats } from "@/data/pk/home";
import { useI18n } from "@/lib/i18n/context";

const iconMap: Record<string, React.ElementType> = {
  districts_reached: MapPin,
  lives_impacted: Users,
  weddings_supported: HeartHandshake,
  volunteers_field: Award,
};

export function PKImpactStats({ stats }: { stats?: AchievementCounter[] }) {
  const { t } = useI18n();
  const displayStats = stats && stats.length >= 4 ? stats : fallbackImpactStats;

  return (
    <section className="relative -mt-10 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-accent text-xs font-bold uppercase tracking-wider">
            {t("sections.impactEyebrow", "Measurable Change")}
          </span>
          <h2 className="text-xl md:text-2xl font-display font-bold text-primary mt-1">
            {t("sections.impactTitle", "Our Verified Field Impact")}
          </h2>
        </div>

        {/* 2x2 grid on mobile / row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {displayStats.slice(0, 4).map((item, index) => {
            const IconComponent = iconMap[item.key] || MapPin;
            return (
              <div key={item.key || index} className="flex flex-col items-center text-center p-3 pt-4 sm:pt-3">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-primary tracking-tight">
                  {item.prefix}{item.value}{item.suffix}
                </div>
                <div className="text-sm font-bold text-primary mt-1">
                  {item.label}
                </div>
                <p className="text-xs text-muted mt-1 max-w-[200px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
