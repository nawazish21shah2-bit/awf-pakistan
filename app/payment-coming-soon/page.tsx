import Link from "next/link";
import { MessageCircle, Building2, ArrowLeft, Clock } from "lucide-react";
import { pkSite } from "@/data/pk/site";
import { PKPageHero } from "@/components/pk/layout/PKPageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Payments Launching Soon | AWF Pakistan",
  description: "Card payment integration is launching soon for AWF Pakistan. Bank transfer and WhatsApp giving are currently active.",
};

export default function PaymentComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <PKPageHero
        badge="Payment Gateway Notice"
        title="Online Card Payments Launching Soon"
        description="Our international card payment gateway is undergoing regulatory compliance integration with banking partners. Direct bank wire transfer and WhatsApp confirmation are fully operational."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate", href: "/donate" },
          { label: "Payment Notice" },
        ]}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        <Link href="/donate" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to donation form</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-accent/10 text-accent mx-auto flex items-center justify-center">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary">
              Direct Bank Transfer &amp; WhatsApp Receipting
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
              You can instantly donate through direct bank deposit or internet banking to our official charity bank account in Pakistan:
            </p>
          </div>

          {/* Bank Transfer Details */}
          <div className="bg-surface p-6 rounded-2xl border border-gray-200 text-left space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Building2 className="w-5 h-5 text-accent" />
              <span>Bank Transfer Account Details (Pakistan)</span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-muted">
              <p><strong>Bank:</strong> {pkSite.bankDetails.bankName} (Islamic Banking)</p>
              <p><strong>Account Title:</strong> {pkSite.bankDetails.accountTitle}</p>
              <p><strong>Account Number:</strong> <span className="font-mono font-bold text-primary">{pkSite.bankDetails.accountNumber}</span></p>
              <p><strong>IBAN:</strong> <span className="font-mono font-bold text-primary">{pkSite.bankDetails.ibanFormatted}</span></p>
              <p><strong>Branch &amp; Code:</strong> {pkSite.bankDetails.branchName} (Code: <span className="font-mono font-bold text-primary">{pkSite.bankDetails.branchCode}</span>)</p>
              <p><strong>SWIFT / BIC:</strong> <span className="font-mono font-bold text-primary">{pkSite.bankDetails.swiftCode}</span> (International Wire)</p>
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="pt-2 space-y-3">
            <p className="text-xs text-muted">
              After transferring, send a screenshot or transaction ID to our WhatsApp representative to receive an immediate electronic receipt:
            </p>
            <a
              href={pkSite.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Receipt via WhatsApp (+92 300 0000000)</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
