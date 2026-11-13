"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart, Phone, Mail, HeartHandshake } from "lucide-react";
import { pkSite, mainNav } from "@/data/pk/site";
import { useI18n } from "@/lib/i18n/context";
import { PKLocaleToggle } from "./PKLocaleToggle";
import { cn } from "@/lib/cn";

export function PKHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar — hidden when mobile drawer is open */}
      {!announcementDismissed && !mobileOpen && (
        <div className="relative bg-primary text-white border-b border-white/10 py-2 sm:py-2.5 px-3 sm:px-4 text-xs md:text-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex-1 flex flex-col sm:flex-row items-center justify-center text-center gap-1.5 sm:gap-2.5 pe-7 sm:pe-0">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 leading-relaxed">
                <span className="inline-flex items-center gap-1 bg-accent text-white px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold shadow-sm shrink-0">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{t("announcement.badge", "Appeal")}</span>
                </span>
                <span className="text-white/90 font-medium">
                  {t("announcement.message", "Urgent Appeal: Support winter food packages and emergency medical relief across Pakistan districts.")}
                </span>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-1.5 font-bold text-red-300 hover:text-white underline underline-offset-2 transition-colors shrink-0 text-xs"
                >
                  <span>{t("announcement.action", "Donate Today")}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAnnouncementDismissed(true)}
              className="absolute end-2 top-2 sm:static text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-gray-200 shadow-lg py-3"
            : "bg-primary border-white/10 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/images/awf-logo.png"
                alt="AWF Pakistan Logo"
                fill
                className="object-contain"
                sizes="48px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-display text-lg font-bold leading-none", scrolled ? "text-gray-900" : "text-white")}>
                AWF Pakistan
              </span>
              <span className={cn("text-[10px] tracking-wider uppercase font-semibold mt-0.5", scrolled ? "text-gray-600" : "text-white/70")}>
                Arrahman Welfare Foundation
              </span>
            </div>
          </Link>

          {/* Navigation Links Right */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => {
              const label = t(item.labelKey, item.labelKey);
              const isActive = pathname === item.href;
              const hasChildren = Boolean(item.children && item.children.length > 0);

              if (hasChildren) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        scrolled
                          ? isActive
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          : isActive
                            ? "text-white bg-white/10"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </Link>

                    {activeDropdown === item.href && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className={cn("border rounded-xl shadow-2xl p-2 space-y-1 backdrop-blur-xl", scrolled ? "bg-white border-gray-200" : "bg-primary-soft border-white/15")}>
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={cn("block px-3 py-2 text-sm rounded-lg transition-colors", scrolled ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-accent/80")}
                            >
                              {'label' in sub ? sub.label : t((sub as any).labelKey || '', '')}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    scrolled
                      ? isActive
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      : isActive
                        ? "text-white bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Donate Button & Language Toggle Far Right */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <PKLocaleToggle scrolled={scrolled} /> */}
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-glow transition-all hover:scale-105 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t("nav.donate", "Donate Now")}</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* <PKLocaleToggle scrolled={scrolled} /> */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn("p-2 rounded-lg transition-colors", scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10")}
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer - full screen overlay, no header bleed-through */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-primary z-[60] flex flex-col overflow-hidden">
          {/* Drawer top bar with logo + close button */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm">
                <Image
                  src="/images/awf-logo.png"
                  alt="AWF Pakistan"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-white leading-none">AWF Pakistan</span>
                <span className="text-[10px] tracking-wider uppercase font-semibold mt-0.5 text-white/70">Arrahman Welfare Foundation</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              aria-label="Close Navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
            {mainNav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-lg font-semibold text-white hover:text-accent transition-colors border-b border-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.labelKey, item.labelKey)}
                </Link>
                {item.children && (
                  <div className="pl-4 py-2 space-y-2">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {'label' in sub ? sub.label : t((sub as any).labelKey || '', '')}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom donate button */}
          <div className="px-5 pb-8 pt-4 shrink-0 border-t border-white/10">
            <Link
              href="/donate"
              className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold py-4 rounded-xl shadow-lg text-base"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>{t("nav.donate", "Donate Now")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
