"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, HelpCircle, MessageCircle, Mail, Sparkles, X, CheckCircle2 } from "lucide-react";
import type { FaqItem, FaqCategory } from "@/types/cms";
import Link from "next/link";

interface PKFaqAccordionProps {
  initialFaqs: FaqItem[];
  categories: FaqCategory[];
}

export function PKFaqAccordion({ initialFaqs, categories }: PKFaqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([initialFaqs[0]?.id || "zakat-eligibility"]));

  // Derive unique categories from both categories table and item category labels
  const allCategoryOptions = useMemo(() => {
    const set = new Set<string>();
    
    // Priority order for categories
    const priority = [
      "Zakat & Religious Giving",
      "Donations & Currencies",
      "Legal & Governance",
      "General Questions",
      "Volunteering & Events",
      "Support & Communication",
    ];

    initialFaqs.forEach((faq) => {
      if (faq.category_label) {
        set.add(faq.category_label);
      }
    });

    categories.forEach((c) => {
      if (c.label) {
        set.add(c.label);
      }
    });

    const list = Array.from(set);
    list.sort((a, b) => {
      const idxA = priority.indexOf(a);
      const idxB = priority.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return [
      { id: "all", label: "All Questions", count: initialFaqs.length },
      ...list.map((label) => ({
        id: label,
        label,
        count: initialFaqs.filter((f) => (f.category_label || "General Questions") === label).length,
      })),
    ];
  }, [initialFaqs, categories]);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (faq.category_label || "General Questions") === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const questionMatch = faq.question.toLowerCase().includes(q);
      const answerMatch = faq.answer.toLowerCase().includes(q);
      const categoryMatch = faq.category_label?.toLowerCase().includes(q);

      return questionMatch || answerMatch || categoryMatch;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

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

  const expandAll = () => {
    setOpenIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. Zakat, Wire Transfer, SECP, Tax Receipt)..."
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center flex-wrap">
        {allCategoryOptions.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm border ${
                isActive
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-accent/5 hover:text-accent hover:border-accent/30"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Actions & Result Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-muted px-1 border-b border-gray-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-primary font-semibold">{filteredFaqs.length}</strong>{" "}
            {filteredFaqs.length === 1 ? "question" : "questions"}
          </span>
          {searchQuery && (
            <span className="bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-md text-xs">
              Matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-accent hover:underline transition-colors"
          >
            Expand All
          </button>
          <span className="text-gray-300">•</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-gray-500 hover:text-gray-700 hover:underline transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion FAQ List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.has(faq.id);
            const categoryBadge = faq.category_label || "General";

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
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isOpen
                          ? "bg-accent text-white"
                          : "bg-accent/10 text-accent group-hover:bg-accent/20"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-accent tracking-wide uppercase">
                          {categoryBadge}
                        </span>
                      </div>
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
                    <div className="border-t border-gray-100 pt-3.5 text-gray-600 text-sm sm:text-base leading-relaxed space-y-3">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent mx-auto flex items-center justify-center">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-primary">
              No matching questions found
            </h3>
            <p className="text-muted text-sm max-w-md mx-auto">
              We couldn&apos;t find any FAQs matching &ldquo;{searchQuery}&rdquo; in this category. Try adjusting your search term or exploring all categories.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-soft transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Trust Highlights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-primary">100% Zakat Certified</h4>
            <p className="text-xs text-muted leading-relaxed">
              Every Zakat donation follows strictly audited Tamleek protocols for Mustahiq families.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-primary">Global Compliance</h4>
            <p className="text-xs text-muted leading-relaxed">
              Operated in strategic partnership with CRA-registered AWF Canada (#766459077RR0001).
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/90 p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-primary">Tax Deductible Receipts</h4>
            <p className="text-xs text-muted leading-relaxed">
              Official NTN donation receipts provided for Pakistani tax residents and corporate donors.
            </p>
          </div>
        </div>
      </div>

      {/* Still Have Questions Contact Box */}
      <div className="bg-gradient-to-br from-primary via-[#242f45] to-primary rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-accent-soft text-xs font-bold uppercase tracking-wider bg-accent/20 px-3 py-1 rounded-full border border-accent/30 inline-block">
              Dedicated Donor Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Still have questions about our work?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl">
              Our donor relations team in Karachi and Toronto is readily available to answer queries regarding bank transfers, Zakat allocation, and project visits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-deep text-white font-bold text-sm transition-all shadow-lg shadow-accent/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
