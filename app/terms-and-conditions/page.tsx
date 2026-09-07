import { Metadata } from "next";
import { PKPageHero } from "@/components/pk/layout/PKPageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | Arrahman Welfare Foundation Pakistan",
  description: "Terms & Conditions for Arrahman Welfare Foundation Pakistan.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <PKPageHero
        badge="Legal & Compliance"
        title="Terms & Conditions"
        description="Terms and conditions governing the use of Arrahman Welfare Foundation Pakistan's services, digital portals, and donor programs in compliance with Pakistan law and SECP regulations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-muted text-sm sm:text-base leading-relaxed">
          <p className="text-xs text-muted">Last Updated: March 2026 • Registered SECP NPO</p>

          <h2 className="text-xl font-display font-bold text-primary pt-2">1. Institutional Governance</h2>
          <p>
            Arrahman Welfare Foundation Pakistan operates in adherence to statutory guidelines enforced by the Securities and Exchange Commission of Pakistan (SECP) and tax compliance standards set forth by the Federal Board of Revenue (FBR).
          </p>

          <h2 className="text-xl font-display font-bold text-primary pt-2">2. Donor Integrity & Data Protection</h2>
          <p>
            We do not sell, rent, or lease donor lists to third parties. All financial transactions conducted via bank wire or authorized partners are logged under strict internal controls.
          </p>

          <h2 className="text-xl font-display font-bold text-primary pt-2">3. Scholar-Supervised Zakat Execution</h2>
          <p>
            All Zakat proceeds are kept strictly segregated from general operational expenses, delivering full value to certified eligible recipients across Pakistan.
          </p>
        </div>
      </main>
    </div>
  );
}
