"use client";

import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/pk/home";
import { useI18n } from "@/lib/i18n/context";

export function PKTestimonials() {
  const [index, setIndex] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5s interval
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative py-24 islamic-pattern text-white overflow-hidden" aria-label="Testimonials">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="space-y-2">
          <span className="text-accent-soft text-xs font-bold uppercase tracking-wider">
            {t("sections.testimonialsEyebrow", "Voices of Impact")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
            {t("sections.testimonialsTitle", "Stories of Trust & Hope")}
          </h2>
        </div>

        {/* Rotating Quote Container */}
        <div className="relative min-h-[220px] sm:min-h-[180px] flex items-center justify-center px-4 sm:px-8">
          <div key={current.id} className="animate-fadeIn space-y-4">
            <Quote className="w-10 h-10 text-accent-soft/60 mx-auto" />
            <p className="text-base sm:text-xl md:text-2xl font-display italic text-white/95 leading-relaxed max-w-3xl mx-auto">
              "{current.quote}"
            </p>
            <div className="pt-3">
              <h4 className="font-bold text-base text-white">{current.name}</h4>
              <p className="text-xs sm:text-sm text-accent-soft">{current.role} • {current.district}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-2 bg-white/40"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
