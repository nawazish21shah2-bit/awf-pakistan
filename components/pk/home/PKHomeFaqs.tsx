"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import type { FaqItem } from "@/types/cms";

interface PKHomeFaqsProps {
  faqs: FaqItem[];
}

export function PKHomeFaqs({ faqs }: PKHomeFaqsProps) {
  const displayFaqs = faqs.slice(0, 4);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([displayFaqs[0]?.id || ""]));

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (displayFaqs.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Essential information regarding our 100% Zakat policy, overseas bank transfers, and verified ground distribution.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {displayFaqs.map((faq) => {
            const isOpen = openIds.has(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden ${
                  isOpen
                    ? "border-accent/40 shadow-md ring-1 ring-accent/10"
                    : "border-gray-200/90 shadow-sm hover:border-accent/30 hover:shadow"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 select-none group"
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isOpen
                          ? "bg-accent text-white"
                          : "bg-accent/10 text-accent group-hover:bg-accent/20"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <span className="text-[11px] font-bold text-accent tracking-wide uppercase">
                        {faq.category_label || "General"}
                      </span>
                      <h3
                        className={`font-display font-bold text-base sm:text-lg leading-snug transition-colors ${
                          isOpen
                            ? "text-primary"
                            : "text-gray-800 group-hover:text-primary"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all duration-300 ${
                      isOpen
                        ? "bg-accent/10 border-accent/30 text-accent rotate-180"
                        : "bg-gray-50 border-gray-200 text-gray-400 group-hover:text-primary group-hover:border-gray-300 rotate-0"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pl-14 sm:pl-16 pt-0 animate-fadeIn">
                    <div className="border-t border-gray-100 pt-3.5 text-gray-600 text-sm sm:text-base leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs Button */}
        <div className="text-center pt-2">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-soft text-white font-bold text-sm shadow-md transition-all group"
          >
            <span>Explore All Frequently Asked Questions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
