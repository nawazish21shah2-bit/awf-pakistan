import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, FileCheck2, Globe2 } from "lucide-react";

export function PKInternationalBridge() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-primary via-[#242f45] to-primary text-white p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5 text-accent" />
                <span>International Bridge of Hope</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Global Transparency Combined with Verified On-Ground Action
              </h3>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Whether you donate from Karachi, Lahore, Toronto, London, or Dubai, your funds are accounted for with full institutional governance, transparent banking channels, and photographic distribution reports.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3.5 rounded-full text-sm shadow-glow transition-all hover:scale-105 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Institutional Governance</span>
                </Link>

                <Link
                  href="/reports"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-full text-sm border border-white/20 transition-all backdrop-blur-md"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>View Financial Audits</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <Image
                  src="/images/awfca/services/humanitarian.jpg"
                  alt="Verified relief distribution in Pakistan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Field Operations Active</p>
                  </div>
                  <p className="font-display font-bold text-sm sm:text-base text-white">Direct Relief Deliveries Across 24+ Districts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}