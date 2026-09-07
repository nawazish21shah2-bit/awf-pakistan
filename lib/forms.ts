/**
 * Form Submission Validation, Rate Limiting & Security Utilities
 * Designed for AWF Pakistan
 */

export const CONSENT_VERSION = "2026-09-01";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  message: string;
  website?: string; // Honeypot field (must be empty)
}

export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  city?: string;
  skills?: string;
  availability?: string;
  message?: string;
  website?: string; // Honeypot
}

export interface DonationInquiryData {
  donorName: string;
  email: string;
  phone?: string;
  currency: string;
  amount: number;
  project?: string;
  transferReference?: string;
  message?: string;
  website?: string; // Honeypot
}

export interface NewsletterFormData {
  email: string;
  website?: string; // Honeypot
}

// In-memory rate limiting bucket
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitBuckets.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

export async function hashIp(ip: string | null): Promise<string | null> {
  if (!ip || ip === "unknown") return null;
  try {
    const salt = process.env.IP_HASH_SALT || "awf-pakistan-salt";
    const data = new TextEncoder().encode(ip + salt);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch {
    return null;
  }
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim()) && email.length <= 160;
}
