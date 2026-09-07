import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Lock,
  Building2,
} from "lucide-react";
import { getPKReports } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Reports, Financial Audits & Governance | AWF Pakistan",
  description: "Official annual reports, statutory financial statements, and project impact evaluations for Arrahman Welfare Foundation Pakistan.",
};

type Props = {
  searchParams?: { year?: string; type?: string };
};

export default async function ReportsPage({ searchParams }: Props) {
  const selectedYear = searchParams?.year;
  const reports = await getPKReports();

  // Extract unique years
  const availableYears = Array.from(
    new Set(reports.map((r) => r.year).filter(Boolean))
  ).sort((a, b) => b.localeCompare(a));

  // Filter reports
  const filteredReports = selectedYear
    ? reports.filter((r) => r.year === selectedYear)
    : reports;

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <section className="relative py-16 sm:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#242f45] to-primary opacity-95" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Institutional Governance &amp; Audit Trail</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            Reports &amp; Financial Audits
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every rupee and dollar entrusted to AWF Pakistan is accounted for with transparent third-party verification, detailed photographic proof, and strict regulatory compliance.
          </p>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>&bull;</li>
              <li className="text-accent-soft font-bold">Reports &amp; Audits</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Compliance & Standards Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-primary">100% Audit Compliance</h3>
              <p className="text-xs text-muted leading-relaxed">
                Subject to regular external financial audits under Pakistani regulatory frameworks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-gray-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-primary">SECP Registered NPO</h3>
              <p className="text-xs text-muted leading-relaxed">
                Operating with certified non-profit status and official charity bank accounts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0 border border-accent/20">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-primary">Backed by AWF Canada</h3>
              <p className="text-xs text-muted leading-relaxed">
                Supervised with international Canadian governance and transparent donor reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Year Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted mr-1">
              Filter By Year:
            </span>
            <Link
              href="/reports"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !selectedYear
                  ? "bg-accent text-white shadow-sm"
                  : "bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent"
              }`}
            >
              All Years ({reports.length})
            </Link>

            {availableYears.map((yr) => {
              const count = reports.filter((r) => r.year === yr).length;
              const isActive = selectedYear === yr;
              return (
                <Link
                  key={yr}
                  href={`/reports?year=${yr}`}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-accent text-white shadow-sm"
                      : "bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent"
                  }`}
                >
                  <span>{yr}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-muted"}`}>
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>

          <span className="text-xs text-muted font-medium">
            Showing {filteredReports.length} published document{filteredReports.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {filteredReports.map((report) => {
              const documentUrl = report.external_url || report.pdf_url || "#";
              const coverImg = report.cover_image_url || "/images/reports/2024-impact-report.jpg";

              return (
                <article
                  key={report.id}
                  className="group bg-white p-2.5 sm:p-3 rounded-[22px] border border-gray-200/80 shadow-[0_18px_50px_rgba(27,36,54,0.07)] hover:shadow-[0_24px_60px_rgba(27,36,54,0.12)] transition-all duration-350 flex flex-col hover:-translate-y-1.5 h-full"
                >
                  {/* Report Portrait Book Cover (0.72 aspect ratio matching Canadian site) */}
                  <div className="relative aspect-[0.72] w-full overflow-hidden rounded-[14px] bg-primary">
                    <a
                      href={documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                      aria-label={`View ${report.title} ${report.year}`}
                    >
                      <Image
                        src={coverImg}
                        alt={`${report.title} ${report.year} cover`}
                        fill
                        className="object-cover group-hover:scale-[1.035] transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    {/* Floating Year Pill at Bottom Right */}
                    <span className="absolute right-3.5 bottom-3.5 z-10 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md tracking-wider">
                      {report.year}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{report.report_type || "Impact Report"}</span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2 min-h-[48px]">
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {report.title}
                        </a>
                      </h3>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                        {report.description ||
                          `Official audited operational summary and verified impact metrics for the ${report.year} period.`}
                      </p>
                    </div>

                    {/* Action Link Button */}
                    <div className="pt-3">
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-deep text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
                      >
                        <span>View Report</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
            <FileText className="w-12 h-12 text-accent/50 mx-auto" />
            <h3 className="text-xl font-bold text-primary">No reports found for {selectedYear}</h3>
            <p className="text-sm text-muted">Please select another year or view all published reports.</p>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold"
            >
              View All Reports
            </Link>
          </div>
        )}

        {/* Audit Inquiry Notice Callout Box */}
        <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-gray-200 text-center max-w-3xl mx-auto space-y-4">
          <h4 className="font-display font-bold text-xl sm:text-2xl text-primary">
            Looking for Institutional Audit Inquiries?
          </h4>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Institutional donors, zakat committees, and regulatory authorities requesting specific ledger breakdowns or project audit annexures can reach our governance desk directly.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-soft text-white font-bold text-xs px-6 py-3 rounded-full transition-colors"
            >
              <span>Contact Governance Desk</span>
            </Link>
            <a
              href="mailto:info@arrahmanwelfare.org"
              className="inline-flex items-center gap-2 bg-white text-primary hover:border-accent hover:text-accent font-bold text-xs px-6 py-3 rounded-full border border-gray-300 transition-colors"
            >
              <span>Email: info@arrahmanwelfare.org</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
