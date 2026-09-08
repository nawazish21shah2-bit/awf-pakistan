"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  ArrowRight,
  Building2,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
  Loader2,
  Send,
} from "lucide-react";
import { pkSite } from "@/data/pk/site";
import { PKPageHero } from "@/components/pk/layout/PKPageHero";

type Currency = "PKR" | "USD" | "AED" | "SAR";

const presets: Record<Currency, number[]> = {
  PKR: [2500, 5000, 10000, 25000, 50000],
  USD: [25, 50, 100, 250, 500],
  AED: [100, 250, 500, 1000, 2000],
  SAR: [100, 250, 500, 1000, 2000],
};

const currencySymbols: Record<Currency, string> = {
  PKR: "Rs.",
  USD: "$",
  AED: "AED",
  SAR: "SAR",
};

function DonateForm() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project");

  const [currency, setCurrency] = useState<Currency>("PKR");
  const [amount, setAmount] = useState<number>(presets.PKR[1]);
  const [customAmount, setCustomAmount] = useState<string>("");

  // Bank Transfer Confirmation State
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [transferRef, setTransferRef] = useState("");
  const [donorNote, setDonorNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submittingNotice, setSubmittingNotice] = useState(false);
  const [noticeSubmitted, setNoticeSubmitted] = useState(false);
  const [noticeError, setNoticeError] = useState<string | null>(null);

  const projectTitle = projectParam
    ? projectParam
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const handleCurrencyChange = (c: Currency) => {
    setCurrency(c);
    setAmount(presets[c][1]);
    setCustomAmount("");
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingNotice(true);
    setNoticeError(null);

    try {
      const res = await fetch("/api/donation-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          email: donorEmail,
          phone: donorPhone,
          currency,
          amount,
          project: projectTitle || "General Welfare Fund",
          transferReference: transferRef,
          message: donorNote,
          website: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unable to save transfer confirmation. Please WhatsApp us.");
      }

      setNoticeSubmitted(true);
    } catch (err: any) {
      setNoticeError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmittingNotice(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <PKPageHero
        badge="Direct Humanitarian Giving"
        title="Donate to AWF Pakistan"
        description="Support Zakat-eligible marriage kits, ration packages, student scholarships, and clean drinking water across Pakistan."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Donate" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl space-y-8">
          {/* If directed from a specific project */}
          {projectTitle && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Your contribution will be dedicated specifically to: <strong>{projectTitle}</strong>
              </span>
            </div>
          )}

          {/* Currency Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-primary tracking-wider">Select Currency</label>
            <div className="grid grid-cols-4 gap-2 bg-surface p-1.5 rounded-2xl border border-gray-200">
              {(["PKR", "USD", "AED", "SAR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCurrencyChange(c)}
                  className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    currency === c ? "bg-accent text-white shadow-md" : "text-muted hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Amounts */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-primary tracking-wider">Select Donation Amount</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {presets[currency].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount("");
                  }}
                  className={`py-3 px-2 text-sm font-bold rounded-2xl border transition-all ${
                    amount === preset && !customAmount
                      ? "border-accent bg-accent/5 text-accent shadow-sm"
                      : "border-gray-200 text-primary hover:border-gray-300"
                  }`}
                >
                  {currencySymbols[currency]} {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-primary tracking-wider">
              Or Enter Custom Amount ({currency})
            </label>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                if (e.target.value) setAmount(Number(e.target.value));
              }}
              placeholder={`Enter amount in ${currency}`}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          {/* Zakat Eligibility Note */}
          <div className="bg-accent/5 border border-accent/20 p-4 rounded-2xl text-primary text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <p>
              <strong>100% Zakat Policy:</strong> All donations marked as Zakat are deposited into dedicated welfare
              accounts and disbursed strictly to verified needy individuals under qualified Islamic scholar supervision.
            </p>
          </div>

          {/* Proceed to Payment / Card Gateway Option */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/payment-coming-soon?currency=${currency}&amount=${amount}${
                projectParam ? `&project=${projectParam}` : ""
              }`}
              className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold py-4 px-6 rounded-2xl shadow-glow text-sm transition-all hover:scale-[1.01]"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>
                Donate Online ({currencySymbols[currency]} {amount.toLocaleString()})
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={pkSite.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-md text-sm transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Donate via WhatsApp</span>
            </a>
          </div>

          {/* Bank Transfer Details Section */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-primary font-bold text-base">
                <Building2 className="w-5 h-5 text-accent" />
                <span>Direct Charity Bank Account (Pakistan)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNotifyForm(!showNotifyForm)}
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                {showNotifyForm ? "Hide Transfer Form" : "Already transferred? Submit Confirmation Reference →"}
              </button>
            </div>

            <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-gray-200 space-y-2.5 text-xs sm:text-sm text-muted">
              <p>
                <strong>Bank Name:</strong> Meezan Bank Ltd. (Islamic Banking)
              </p>
              <p>
                <strong>Account Title:</strong> Arrahman Welfare Foundation Pakistan
              </p>
              <p>
                <strong>Account Number:</strong> 0000-0000-0000-0000
              </p>
              <p>
                <strong>IBAN:</strong> PK00MEZN0000000000000000
              </p>
              <p>
                <strong>Branch:</strong> Sadiqabad Branch, Rahim Yar Khan
              </p>
              <p className="text-accent font-semibold pt-1 border-t border-gray-200/60 mt-2">
                Share payment receipt or screenshot on WhatsApp ({pkSite.phoneDisplay}) or submit the confirmation form
                below for instant official acknowledgment.
              </p>
            </div>

            {/* Interactive Bank Transfer Notification Form */}
            {showNotifyForm && (
              <div className="bg-emerald-50/60 border border-emerald-200 p-6 rounded-2xl space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-emerald-950">Record Your Bank Transfer</h3>
                  <p className="text-xs text-emerald-800">
                    Provide your transfer reference and email address so our finance desk can issue your formal tax
                    receipt.
                  </p>
                </div>

                {noticeSubmitted ? (
                  <div className="bg-white p-4 rounded-xl border border-emerald-300 text-emerald-900 text-xs sm:text-sm space-y-2">
                    <p className="font-bold flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Transfer Notification Recorded!</span>
                    </p>
                    <p className="text-muted">
                      Thank you. We will verify the transaction and email your official donation receipt within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNoticeSubmit} className="space-y-3 pt-1">
                    {noticeError && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl flex items-center gap-2 text-xs">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{noticeError}</span>
                      </div>
                    )}

                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-primary uppercase mb-1">Donor Name *</label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-1 focus:ring-accent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-primary uppercase mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="for receipt delivery"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-1 focus:ring-accent outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-primary uppercase mb-1">
                          Transfer Ref / Transaction ID
                        </label>
                        <input
                          type="text"
                          value={transferRef}
                          onChange={(e) => setTransferRef(e.target.value)}
                          placeholder="e.g. TRX-982312 or Meezan Ref"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-1 focus:ring-accent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-primary uppercase mb-1">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="tel"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="+92 300 0000000"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-1 focus:ring-accent outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingNotice}
                      className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-deep text-white font-bold text-xs py-2.5 px-6 rounded-full shadow-sm transition-all"
                    >
                      {submittingNotice ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Transfer Record ({currencySymbols[currency]} {amount.toLocaleString()})</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">Loading donation portal...</div>}>
      <DonateForm />
    </Suspense>
  );
}
