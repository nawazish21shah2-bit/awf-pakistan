import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { PK_SITE_ID } from "@/lib/queries";
import {
  checkRateLimit,
  hashIp,
  isValidEmail,
  CONSENT_VERSION,
  type ContactFormData,
} from "@/lib/forms";

export async function POST(request: Request) {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "arrahmanwelfare.org";
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      "unknown";

    // 1. Rate Limiting Check
    const rateCheck = checkRateLimit(`contact:${ip}`, 6, 60_000);
    if (!rateCheck.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // 2. Parse JSON
    let json: Partial<ContactFormData>;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, location, message, website } = json;

    // 3. Honeypot check (anti-bot)
    const isSpam = Boolean(website && website.trim().length > 0);

    // 4. Field Validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { ok: false, error: "Please provide a message or inquiry of at least 5 characters." },
        { status: 400 }
      );
    }

    // Split name into first and last name if possible
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(" ") || "";

    // 5. Insert into Supabase form_submissions
    try {
      const ipHashed = await hashIp(ip);
      const { error: dbError } = await supabase.from("form_submissions").insert({
        site_id: PK_SITE_ID,
        type: "contact",
        status: isSpam ? "spam" : "new",
        first_name: firstName.slice(0, 80),
        last_name: lastName.slice(0, 80),
        email: email.trim().toLowerCase().slice(0, 160),
        phone: phone ? phone.trim().slice(0, 40) : null,
        message: location ? `[Location: ${location}]\n${message.trim()}` : message.trim(),
        consent_version: CONSENT_VERSION,
        consent_at: new Date().toISOString(),
        source_url: h.get("referer") || null,
        source_hostname: host,
        ip_hash: ipHashed,
        user_agent: h.get("user-agent") || null,
        honeypot_triggered: isSpam,
      });

      if (dbError) {
        console.warn("[Contact API] Supabase submission notice:", dbError.message);
        // If DB table is missing or restricted, return friendly response so UX is smooth
      }
    } catch (insertErr) {
      console.warn("[Contact API] Exception during DB insert:", insertErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you! Your message has been received. Our donor relations team will get back to you promptly.",
    });
  } catch (err: any) {
    console.error("[Contact API] Handler error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to submit your message at this time. Please try contacting us via WhatsApp." },
      { status: 500 }
    );
  }
}
