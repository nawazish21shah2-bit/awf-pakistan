"use client";

import React, { useState } from "react";
import { MapPin, Mail, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { pkSite } from "@/data/pk/site";
import { PKPageHero } from "@/components/pk/layout/PKPageHero";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Pakistan",
    message: "",
    website: "", // Honeypot field (hidden from users)
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unable to send your message. Please try again or reach out on WhatsApp.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "Pakistan",
        message: "",
        website: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <PKPageHero
        badge="Get In Touch • Dedicated Support"
        title="Contact AWF Pakistan"
        description="Have questions about making a Zakat contribution, corporate matching, wire transfers, or verifying a family in need? We are here to assist."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-accent/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-primary">Pakistan Office</h3>
              <p className="text-sm text-muted leading-relaxed">{pkSite.address}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-accent/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-primary">WhatsApp Helpline</h3>
              <p className="text-sm text-muted">Pakistan: {pkSite.phoneDisplay}</p>
              {/* Gulf Representative commented out for now:
              <p className="text-sm text-muted">Gulf Representative: +971 50 0000000</p>
              */}
              <a
                href={pkSite.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-accent hover:underline pt-1"
              >
                Start WhatsApp Chat &rarr;
              </a>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:border-accent/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-primary">Email Inquiries</h3>
              <p className="text-sm text-muted font-medium">{pkSite.email}</p>
              <p className="text-xs text-muted/80 pt-1">Official Donor & Support Desk</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-display font-bold text-primary">Send Us a Direct Message</h2>
              <p className="text-xs sm:text-sm text-muted">Fill out the inquiry form below and our donor desk will respond within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 sm:p-8 rounded-2xl space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <h3 className="font-bold text-base text-emerald-950">Inquiry Successfully Submitted!</h3>
                </div>
                <p className="text-sm leading-relaxed text-emerald-800">
                  Thank you! Your message has been received. Our donor relations team will review your inquiry and get back to you promptly.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                  <a
                    href={pkSite.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/50 font-semibold text-xs px-4 py-2.5 rounded-full transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot field for bot protection */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ahmad Khan"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmad@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 332 7240914"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase mb-1">Donor Origin Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent text-sm bg-white"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="UAE">United Arab Emirates (UAE)</option>
                      <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="United States">United States (USA)</option>
                      <option value="Canada">Canada</option>
                      <option value="Other">Other Overseas Country</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase mb-1">Message / Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you with Zakat donation, bank transfers, or family verification?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep disabled:bg-accent/60 text-white font-bold px-8 py-3.5 rounded-full shadow-glow transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Office Location Map */}
        <div className="rounded-3xl overflow-hidden shadow-md border border-gray-200 h-72 w-full relative bg-gray-100 flex items-center justify-center">
          <iframe
            title="AWF Pakistan Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106197.83984144414!2d72.94605929285408!3d33.6844202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </main>
    </div>
  );
}
