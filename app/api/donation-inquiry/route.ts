import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { PK_SITE_ID } from "@/lib/queries";
import {
  checkRateLimit,
  hashIp,
  isValidEmail,
  CONSENT_VERSION,
  type DonationInquiryData,
} from "@/lib/forms";

export async function POST(request: Request) {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "arrahmanwelfare.org";
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      "unknown";

    const rateCheck = checkRateLimit(`donation-inquiry:${ip}`, 6, 60_000);
    if (!rateCheck.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    let json: Partial<DonationInquiryData>;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { donorName, email, phone, currency, amount, project, transferReference, message, website } = json;
    const isSpam = Boolean(website && website.trim().length > 0);

    if (!donorName || typeof donorName !== "string" || donorName.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address for your official receipt." },
        { status: 400 }
      );
    }

    const nameParts = donorName.trim().split(/\s+/);
    const firstName = nameParts[0] || donorName.trim();
    const lastName = nameParts.slice(1).join(" ") || "";

    const detailsMessage = [
      `[Bank Transfer Notification / Donation Inquiry]`,
      `Currency & Amount: ${currency || "PKR"} ${amount ? Number(amount).toLocaleString() : "Not specified"}`,
      project ? `Dedicated Project: ${project}` : `Dedicated Project: General Welfare Fund`,
      transferReference ? `Transfer / Transaction Ref: ${transferReference}` : null,
      message ? `Donor Note: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const ipHashed = await hashIp(ip);
      const { error: dbError } = await supabase.from("form_submissions").insert({
        site_id: PK_SITE_ID,
        type: "donation_inquiry",
        status: isSpam ? "spam" : "new",
        first_name: firstName.slice(0, 80),
        last_name: lastName.slice(0, 80),
        email: email.trim().toLowerCase().slice(0, 160),
        phone: phone ? phone.trim().slice(0, 40) : null,
        message: detailsMessage,
        consent_version: CONSENT_VERSION,
        consent_at: new Date().toISOString(),
        source_url: h.get("referer") || null,
        source_hostname: host,
        ip_hash: ipHashed,
        user_agent: h.get("user-agent") || null,
        honeypot_triggered: isSpam,
      });

      if (dbError) {
        console.warn("[Donation Inquiry API] Supabase notice:", dbError.message);
      }
    } catch (insertErr) {
      console.warn("[Donation Inquiry API] DB exception:", insertErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Your donation confirmation has been recorded! Our finance team will verify the transfer and email your official tax/donation receipt.",
    });
  } catch (err) {
    console.error("[Donation Inquiry API] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to record donation confirmation. Please message us on WhatsApp with your transaction screenshot." },
      { status: 500 }
    );
  }
}
