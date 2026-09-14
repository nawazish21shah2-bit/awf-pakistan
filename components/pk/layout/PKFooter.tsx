"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { pkSite, footerQuickLinks, footerServices, footerSupport } from "@/data/pk/site";
import { useI18n } from "@/lib/i18n/context";

export function PKFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-white border-t border-white/10">
      {/* Top Banner: WhatsApp Direct Donation Call-To-Action */}
      <div className="bg-gradient-to-r from-accent to-accent-deep py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">
              Direct Giving via WhatsApp in Pakistan
            </h3>
            <p className="text-white/90 text-sm max-w-2xl">
              Connect directly with our authorized team for bank account details, Zakat calculations, and immediate confirmation receipts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={pkSite.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t("footer.whatsappCta", "Donate via WhatsApp")}</span>
            </a>
            {/* Gulf WhatsApp commented out for now:
            <a
              href={(pkSite as any).gulfWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-3 rounded-full backdrop-blur-md transition-colors text-sm"
            >
              <span>Gulf Donors (+971)</span>
            </a>
            */}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                <Image
                  src="/images/awf-logo.png"
                  alt="AWF Pakistan Logo"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <div>
                <h4 className="font-display font-bold text-xl leading-tight">
                  {pkSite.name}
                </h4>
                <p className="text-xs text-white/60">Reg. No. {pkSite.registrationNo}</p>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              {pkSite.description}
            </p>

            {/* Taglines */}
            <div className="pt-2 border-t border-white/10 space-y-1">
              <p className="text-xs font-semibold text-accent-soft italic">
                "{t("footer.tagline", pkSite.tagline)}"
              </p>
              <p className="text-xs font-urdu text-white/70 leading-relaxed">
                "{t("footer.urduTagline", pkSite.urduTagline)}"
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/60 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{pkSite.legalStatus}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white">
              {t("footer.quickLinks", "Quick Links")}
            </h5>
            <ul className="space-y-2 text-sm text-white/70">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white">
              {t("footer.projects", "Our Projects")}
            </h5>
            <ul className="space-y-2 text-sm text-white/70">
              {footerServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white">
              Pakistan Office
            </h5>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent-soft shrink-0 mt-0.5" />
                <span>{pkSite.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-soft shrink-0" />
                <a href={pkSite.phoneHref} className="hover:text-white">{pkSite.phoneDisplay}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-soft shrink-0" />
                <a href={`mailto:${pkSite.email}`} className="hover:text-white">{pkSite.email}</a>
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 text-xs font-bold text-accent-soft hover:text-white transition-colors"
              >
                <span>View Bank Transfer Details</span> &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center md:text-left">
          <p>{t("footer.copyright", pkSite.copyright)}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {footerSupport.slice(2).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white/80 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
