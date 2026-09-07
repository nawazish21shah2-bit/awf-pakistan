import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { PK_SITE_ID } from "@/lib/queries";
import {
  checkRateLimit,
  hashIp,
  isValidEmail,
  CONSENT_VERSION,
  type NewsletterFormData,
} from "@/lib/forms";

export async function POST(request: Request) {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "arrahmanwelfare.org";
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      "unknown";

    const rateCheck = checkRateLimit(`newsletter:${ip}`, 5, 60_000);
    if (!rateCheck.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many subscription attempts. Please try again in a few moments." },
        { status: 429 }
      );
    }

    let json: Partial<NewsletterFormData>;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { email, website } = json;
    const isSpam = Boolean(website && website.trim().length > 0);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    try {
      const ipHashed = await hashIp(ip);
      const { error: dbError } = await supabase.from("form_submissions").insert({
        site_id: PK_SITE_ID,
        type: "newsletter",
        status: isSpam ? "spam" : "new",
        email: email.trim().toLowerCase().slice(0, 160),
        message: "Newsletter Subscription (AWF Pakistan Updates)",
        consent_version: CONSENT_VERSION,
        consent_at: new Date().toISOString(),
        source_url: h.get("referer") || null,
        source_hostname: host,
        ip_hash: ipHashed,
        user_agent: h.get("user-agent") || null,
        honeypot_triggered: isSpam,
      });

      if (dbError) {
        console.warn("[Newsletter API] Supabase notice:", dbError.message);
      }
    } catch (insertErr) {
      console.warn("[Newsletter API] DB exception:", insertErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you for subscribing to AWF Pakistan updates!",
    });
  } catch (err) {
    console.error("[Newsletter API] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
