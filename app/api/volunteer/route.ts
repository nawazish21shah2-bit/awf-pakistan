import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { PK_SITE_ID } from "@/lib/queries";
import {
  checkRateLimit,
  hashIp,
  isValidEmail,
  CONSENT_VERSION,
  type VolunteerFormData,
} from "@/lib/forms";

export async function POST(request: Request) {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "arrahmanwelfare.org";
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      "unknown";

    const rateCheck = checkRateLimit(`volunteer:${ip}`, 5, 60_000);
    if (!rateCheck.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    let json: Partial<VolunteerFormData>;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, city, skills, availability, message, website } = json;
    const isSpam = Boolean(website && website.trim().length > 0);

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid contact number or WhatsApp number." },
        { status: 400 }
      );
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(" ") || "";

    const fullMessage = [
      city ? `City/Location: ${city}` : null,
      skills ? `Skills/Background: ${skills}` : null,
      availability ? `Availability: ${availability}` : null,
      message ? `Note: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const ipHashed = await hashIp(ip);
      const { error: dbError } = await supabase.from("form_submissions").insert({
        site_id: PK_SITE_ID,
        type: "volunteer",
        status: isSpam ? "spam" : "new",
        first_name: firstName.slice(0, 80),
        last_name: lastName.slice(0, 80),
        email: email.trim().toLowerCase().slice(0, 160),
        phone: phone.trim().slice(0, 40),
        message: fullMessage,
        consent_version: CONSENT_VERSION,
        consent_at: new Date().toISOString(),
        source_url: h.get("referer") || null,
        source_hostname: host,
        ip_hash: ipHashed,
        user_agent: h.get("user-agent") || null,
        honeypot_triggered: isSpam,
      });

      if (dbError) {
        console.warn("[Volunteer API] Supabase notice:", dbError.message);
      }
    } catch (insertErr) {
      console.warn("[Volunteer API] DB exception:", insertErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you for joining our volunteer network! Our ground coordinator will contact you shortly.",
    });
  } catch (err) {
    console.error("[Volunteer API] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to process application right now. Please message us on WhatsApp." },
      { status: 500 }
    );
  }
}
