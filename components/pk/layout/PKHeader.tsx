"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart, Phone, Mail } from "lucide-react";
import { PKLocaleToggle } from "./PKLocaleToggle";
import { pkSite, mainNav } from "@/data/pk/site";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

export function PKHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    <header className="sticky top-0 z-40 w-full">
      {/* Top Bar for contact & trust */}
      <div className="hidden lg:block bg-primary-soft text-white/80 text-xs py-1.5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-white/60">SECP Reg. NPO | Backed by AWF Canada</span>
            <a href={pkSite.phoneHref} className="hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <Phone className="w-3 h-3" />
              <span>{pkSite.phoneDisplay}</span>
            </a>
            <a href={`mailto:${pkSite.email}`} className="hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <Mail className="w-3 h-3" />
              <span>{pkSite.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-accent-soft font-semibold">100% Zakat Policy</span>
            <span className="text-white/40">•</span>
            <span className="text-white/70">Zakat & Sadaqah Verified</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-primary/95 backdrop-blur-md border-white/10 shadow-lg py-3"
            : "bg-primary border-white/10 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/images/awf-logo.png"
                alt="AWF Pakistan Logo"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-white leading-none">
                AWF Pakistan
              </span>
              <span className="text-[10px] tracking-wider uppercase text-white/70 font-semibold mt-0.5">
                Arrahman Welfare Foundation
              </span>
            </div>
          </Link>

          {/* EN | UR Toggle Centre-Left */}
          {/* <div className="hidden sm:block">
            <PKLocaleToggle />
          </div> */}

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
                        isActive ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </Link>

                    {activeDropdown === item.href && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className="bg-primary-soft border border-white/15 rounded-xl shadow-2xl p-2 space-y-1 backdrop-blur-xl">
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block px-3 py-2 text-sm rounded-lg text-white/80 hover:text-white hover:bg-accent/80 transition-colors"
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
                    isActive ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Donate Button (Accent) Far Right */}
          <div className="hidden lg:flex items-center gap-3">
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
            {/* <PKLocaleToggle className="sm:hidden" /> */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-primary/95 backdrop-blur-xl border-t border-white/10 p-6 overflow-y-auto z-50 flex flex-col justify-between">
          <div className="space-y-4">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-white/10 pb-3">
                <Link
                  href={item.href}
                  className="block text-lg font-semibold text-white hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.labelKey, item.labelKey)}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block text-sm text-white/70 hover:text-white"
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

          <div className="pt-6">
            <Link
              href="/donate"
              className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-bold py-3.5 rounded-xl shadow-lg"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t("nav.donate", "Donate Now")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
