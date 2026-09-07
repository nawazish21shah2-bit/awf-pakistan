import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Building2,
  Globe,
  Heart,
  CheckCircle2,
  Users,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Eye,
  Target,
  Scale,
  HandHeart,
} from "lucide-react";
import { pkSite } from "@/data/pk/site";
import { PKPageHero } from "@/components/pk/layout/PKPageHero";

export const metadata: Metadata = {
  title: "About Us | Arrahman Welfare Foundation Pakistan",
  description:
    "Learn about Arrahman Welfare Foundation Pakistan, our mission to combat poverty, 100% Zakat Tamleek compliance, SECP registration, and our strategic governance partnership with AWF Canada.",
  openGraph: {
    title: "About Us | Arrahman Welfare Foundation Pakistan",
    description:
      "Our mission, vision, governance pillars, and humanitarian work across Pakistan.",
  },
};

const coreValues = [
  {
    icon: Scale,
    title: "Authentic Tamleek & Zakat Integrity",
    description:
      "All Zakat funds are managed under qualified Islamic scholars, ensuring strict transfer of complete ownership (Tamleek) to verified Mustahiq recipients with zero administrative deductions.",
    badge: "100% Zakat Certified",
  },
  {
    icon: FileCheck2,
    title: "Uncompromising Transparency",
    description:
      "Every project, food pack, clean water plant, and wedding kit is documented with photographic proof, recipient CNIC records, and independent annual audits.",
    badge: "Audited Accountability",
  },
  {
    icon: HandHeart,
    title: "Dignity & Respect First",
    description:
      "We serve families without humiliation or exploitative publicity, upholding the honor and self-worth of vulnerable widows, orphans, and daily wage earners.",
    badge: "Compassionate Delivery",
  },
  {
    icon: Target,
    title: "Sustainable Empowerment",
    description:
      "Beyond emergency relief, we provide marriage kits, solar water wells, IT skills training, and scholarships to help destitute households break generational poverty.",
    badge: "Long-term Impact",
  },
];

const methodologySteps = [
  {
    step: "01",
    title: "Ground Identification",
    description:
      "Our local field coordinators conduct door-to-door surveys across rural and peri-urban union councils to locate genuinely destitute households.",
  },
  {
    step: "02",
    title: "Need & Zakat Audit",
    description:
      "Households are vetted against verifiable criteria, including monthly income thresholds, orphan/widow status, and official CNIC documentation.",
  },
  {
    step: "03",
    title: "Direct Handover",
    description:
      "Assistance—whether marriage household kits, ration packs, or solar pumps—is delivered directly to recipients with zero middleman commissions.",
  },
  {
    step: "04",
    title: "Reporting & Audit",
    description:
      "Detailed photographic distribution reports and financial records are compiled for donors, verified by external statutory auditors.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* 1. Page Hero Header */}
      <PKPageHero
        badge="Our Identity & Purpose"
        title="Restoring Dignity & Empowering Families"
        description="Driven by Islamic principles of authentic Tamleek and international governance standards, Arrahman Welfare Foundation transforms lives across 24+ districts in Pakistan."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 space-y-20 sm:space-y-28">
        
        {/* 2. Our Story & Founding Mission (2-Column Showcase) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story &amp; Motivation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary leading-tight tracking-tight">
              A Direct Bridge of Compassion from Global Donors to Pakistan&apos;s Field
            </h2>

            <p className="text-muted text-base sm:text-lg leading-relaxed">
              Arrahman Welfare Foundation Pakistan was established with a singular, unwavering resolve: to ensure that overseas and local charitable giving reaches the most vulnerable Pakistani families without dilution, delays, or administrative waste.
            </p>

            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Across Punjab, Sindh, Khyber Pakhtunkhwa, and Balochistan, millions of families face catastrophic hardship—from devastating seasonal floods and clean water scarcity to the crippling societal debt of arranging basic weddings for underprivileged daughters. We operate directly on the ground to alleviate these burdens with honor and speed.
            </p>

            {/* Key Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-accent">24+</span>
                <p className="text-xs font-bold text-primary">Districts Reached</p>
                <p className="text-[11px] text-muted">Across all 4 provinces</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-accent">100%</span>
                <p className="text-xs font-bold text-primary">Zakat Certified</p>
                <p className="text-[11px] text-muted">Scholar supervised</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-accent">250K+</span>
                <p className="text-xs font-bold text-primary">Lives Impacted</p>
                <p className="text-[11px] text-muted">Verified beneficiaries</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/images/awfca/services/humanitarian.jpg"
                alt="Humanitarian relief distribution in Pakistan"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              
              {/* Floating Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/40 shadow-xl text-primary space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>On-Ground Relief in Pakistan</span>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  Direct food ration distributions, emergency flood relief, and wedding starter kits delivered with full transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mission & Vision Cards */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full inline-block">
              Our Compass
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm space-y-4 hover:shadow-xl hover:border-accent/40 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-primary">Our Mission</h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                To alleviate poverty, hunger, and destitution across Pakistan by delivering scholar-verified, 100% Zakat-compliant welfare programs in essential food security, marriage assistance for underprivileged daughters, clean drinking water plants, student scholarships, and emergency relief.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-sm space-y-4 hover:shadow-xl hover:border-accent/40 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-primary">Our Vision</h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                A thriving Pakistan where no family is forced into bonded debt or generational poverty, where every child has access to quality education, every household has clean water, and every vulnerable individual is treated with the dignity and respect they inherently deserve.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Core Values & Principles (4-Card Grid) */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full inline-block">
              Foundational Principles
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">
              Our Core Values
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              Every project and dollar entrusted to AWF Pakistan is guided by four immutable pillars of ethical humanitarian practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider block mb-1">
                        {value.badge}
                      </span>
                      <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-xs font-bold text-gray-400">
                    Value 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Strategic Partnership with AWF Canada */}
        <section className="bg-gradient-to-br from-primary via-[#242f45] to-primary text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-accent" />
                <span>Global Governance Bridge</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Backed by Arrahman Welfare Foundation Canada
              </h2>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                AWF Pakistan operates under strict governance and audit oversight aligned with <strong>Arrahman Welfare Foundation Canada</strong> (CRA-registered charity # 766459077RR0001).
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                This partnership guarantees that international donors contributing in CAD, USD, AED, SAR, or GBP receive full institutional accountability, verified wire distribution, and independent third-party audits.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/reports"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3.5 rounded-full text-sm shadow-glow transition-all hover:scale-105"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>View Published Audit Reports</span>
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-full text-sm border border-white/20 transition-all backdrop-blur-md"
                >
                  <Users className="w-4 h-4" />
                  <span>Meet Our Leadership</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4 text-center lg:text-left">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent-soft flex items-center justify-center mx-auto lg:mx-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Compliance Badges</h3>
              <div className="space-y-2 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Canada CRA Charity # 766459077RR0001</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SECP Registered Non-Profit Organization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>FBR Active NTN Tax Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Shariah Board Zakat Supervision</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Operational Methodology Lifecycle */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full inline-block">
              Execution Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary">
              How We Deliver Aid on the Ground
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              A 4-stage systematic pipeline ensuring that every donation is accounted for from receipt to recipient hands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((m) => (
              <div
                key={m.step}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm space-y-3 relative hover:border-accent/40 transition-colors"
              >
                <span className="text-3xl font-display font-extrabold text-accent/20 block">
                  {m.step}
                </span>
                <h3 className="font-display font-bold text-lg text-primary">
                  {m.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Pakistan Head Office & Accreditations */}
        <section className="bg-surface p-8 sm:p-12 rounded-3xl border border-gray-200 space-y-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-7 h-7 text-accent" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary">
              Pakistan Office &amp; Regulatory Accreditations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs text-muted block font-semibold">Regulatory Body</span>
              <span className="font-bold text-primary text-base block">
                Securities &amp; Exchange Commission of Pakistan
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Operating in compliance with non-profit corporate governance guidelines under SECP regulations.
              </p>
              <span className="inline-block mt-2 text-xs bg-accent/10 text-accent font-bold px-2.5 py-1 rounded-md">
                Registered Non-Profit
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs text-muted block font-semibold">Tax Authority</span>
              <span className="font-bold text-primary text-base block">
                Federal Board of Revenue (FBR)
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Official NTN donation receipts issued for all local Pakistani direct transfers and corporate giving.
              </p>
              <span className="inline-block mt-2 text-xs bg-accent/10 text-accent font-bold px-2.5 py-1 rounded-md">
                NTN Tax Deductible
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs text-muted block font-semibold">National Head Office</span>
              <span className="font-bold text-primary text-base block">
                {pkSite.address}
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Active ground volunteer coordination desks serving 24+ districts across all 4 provinces.
              </p>
              <span className="inline-block mt-2 text-xs bg-primary text-white font-bold px-2.5 py-1 rounded-md">
                Direct Field Command
              </span>
            </div>
          </div>
        </section>

        {/* 8. Call to Action Banner */}
        <section className="bg-gradient-to-r from-primary via-primary-soft to-primary text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
              Join Our Mission to Transform Lives in Pakistan
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Explore our ongoing welfare initiatives or calculate and dedicate your Zakat to verified families in need today.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-3.5 rounded-full shadow-glow text-sm transition-all hover:scale-105"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate to a Field Project</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-7 py-3.5 rounded-full text-sm border border-white/20 transition-all"
              >
                <span>Explore All Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
