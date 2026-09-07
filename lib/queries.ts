import { supabase } from "./supabase";
import type { Program, AchievementCounter, TeamMember, FaqItem, FaqCategory, Report, Post } from "@/types/cms";
import { pkFaqs } from "@/data/pk/faqs";
import { fallbackImpactStats } from "@/data/pk/home";
import {
  fallbackPKPrograms,
  fallbackPKPosts,
  fallbackPKReports,
  fallbackPKTeam,
} from "@/data/pk/fallback-data";
import { PK_SITE_ID, CA_SITE_ID } from "./constants";
export { PK_SITE_ID, CA_SITE_ID };

/**
 * Helper to resolve records with site overrides.
 * Populates base shared records (site_id = null) and overrides or supplements with site-specific records (site_id = PK_SITE_ID).
 */
function resolveOverrides<T extends { id: string; slug?: string; site_id: string | null; override_of_id?: string | null; sort_order?: number }>(
  items: T[],
  siteId: string
): T[] {
  const map = new Map<string, T>();

  // 1. First populate with shared base records
  for (const item of items) {
    const key = item.slug || item.id;
    if (item.site_id !== siteId) {
      map.set(key, item);
    }
  }

  // 2. Override or supplement with site-specific records
  for (const item of items) {
    if (item.site_id === siteId) {
      if (item.override_of_id) {
        map.delete(item.override_of_id);
      }
      const key = item.slug || item.id;
      map.set(key, item);
    }
  }

  const result = Array.from(map.values());
  return result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

/**
 * Retrieves all published programs active for Pakistan (site_id is null or site_id === PK_SITE_ID).
 * Directly sourced from the CMS database with fallback to curated programs.
 */
export async function getPKPrograms(): Promise<Program[]> {
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[getPKPrograms] Notice:", error.message);
      return fallbackPKPrograms;
    }
    const resolved = resolveOverrides<Program>((data as Program[]) || [], PK_SITE_ID);
    return resolved.length > 0 ? resolved : fallbackPKPrograms;
  } catch (err) {
    console.warn("[getPKPrograms] Exception, using fallback:", err);
    return fallbackPKPrograms;
  }
}

export async function getPKProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const programs = await getPKPrograms();
    const found = programs.find((p) => p.slug === slug);
    if (found) return found;

    // Direct DB lookup attempt
    const { data } = await supabase
      .from("programs")
      .select("*")
      .eq("slug", slug)
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .maybeSingle();

    if (data) return data as Program;

    return fallbackPKPrograms.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.warn("[getPKProgramBySlug] Error:", err);
    return fallbackPKPrograms.find((p) => p.slug === slug) || null;
  }
}

export async function getRelatedPKPrograms(currentSlug: string, category?: string): Promise<Program[]> {
  const all = await getPKPrograms();
  return all
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (category && a.category === category && b.category !== category) return -1;
      if (category && b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, 3);
}

/**
 * Retrieves all published achievement / impact counters for Pakistan.
 */
export async function getPKImpactStats(): Promise<AchievementCounter[]> {
  try {
    const { data, error } = await supabase
      .from("achievement_counters")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackImpactStats as unknown as AchievementCounter[];
    }
    return (data as AchievementCounter[]) || (fallbackImpactStats as unknown as AchievementCounter[]);
  } catch (err) {
    console.warn("[getPKImpactStats] Exception, using fallback:", err);
    return fallbackImpactStats as unknown as AchievementCounter[];
  }
}

/**
 * Retrieves all published team members for Pakistan.
 */
export async function getPKTeam(): Promise<TeamMember[]> {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackPKTeam;
    }
    const resolved = resolveOverrides<TeamMember>((data as TeamMember[]) || [], PK_SITE_ID);
    return resolved.length > 0 ? resolved : fallbackPKTeam;
  } catch (err) {
    console.warn("[getPKTeam] Exception, using fallback:", err);
    return fallbackPKTeam;
  }
}

export async function getCALeadershipTeam(): Promise<TeamMember[]> {
  return getPKTeam();
}

/**
 * Retrieves all FAQ categories active for Pakistan.
 */
export async function getPKFaqCategories(): Promise<FaqCategory[]> {
  try {
    const { data, error } = await supabase
      .from("faq_categories")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }
    return (data as FaqCategory[]) || [];
  } catch (err) {
    console.warn("[getPKFaqCategories] Exception:", err);
    return [];
  }
}

/**
 * Retrieves all published FAQs for Pakistan from the CMS.
 * Gracefully falls back to curated pkFaqs if database returns empty.
 */
export async function getPKFaqs(): Promise<FaqItem[]> {
  try {
    const [faqsRes, catsRes] = await Promise.all([
      supabase
        .from("faq_items")
        .select("*")
        .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order", { ascending: true }),
      supabase
        .from("faq_categories")
        .select("*")
        .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order", { ascending: true }),
    ]);

    const catMap = new Map<string, string>();
    if (catsRes.data) {
      catsRes.data.forEach((c) => catMap.set(c.id, c.label));
    }

    if (faqsRes.data && faqsRes.data.length > 0) {
      return faqsRes.data.map((f) => ({
        ...f,
        category_label: f.category_id ? catMap.get(f.category_id) || "General Questions" : "General Questions",
      }));
    }

    // Fallback if DB returns no FAQs
    return pkFaqs.map((f, idx) => ({
      id: f.id,
      site_id: PK_SITE_ID,
      category_id: null,
      category_label: f.category,
      question: f.question,
      answer: f.answer,
      placement: "page",
      status: "published" as const,
      sort_order: idx,
    }));
  } catch (err) {
    console.warn("[getPKFaqs] Exception, using pkFaqs:", err);
    return pkFaqs.map((f, idx) => ({
      id: f.id,
      site_id: PK_SITE_ID,
      category_id: null,
      category_label: f.category,
      question: f.question,
      answer: f.answer,
      placement: "page",
      status: "published" as const,
      sort_order: idx,
    }));
  }
}

/**
 * Retrieves all published annual & financial impact reports for Pakistan.
 */
export async function getPKReports(): Promise<Report[]> {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("year", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackPKReports;
    }
    const resolved = resolveOverrides<Report>((data as Report[]) || [], PK_SITE_ID);
    return resolved.length > 0 ? resolved : fallbackPKReports;
  } catch (err) {
    console.warn("[getPKReports] Exception, using fallback:", err);
    return fallbackPKReports;
  }
}

/**
 * Retrieves all published field dispatches, stories, and news for Pakistan.
 */
export async function getPKPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error || !data || data.length === 0) {
      return fallbackPKPosts;
    }
    const resolved = resolveOverrides<Post>((data as Post[]) || [], PK_SITE_ID);
    return resolved.length > 0 ? resolved : fallbackPKPosts;
  } catch (err) {
    console.warn("[getPKPosts] Exception, using fallback:", err);
    return fallbackPKPosts;
  }
}

export async function getPKPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getPKPosts();
    const found = posts.find((p) => p.slug === slug);
    if (found) return found;

    // Direct DB lookup attempt
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .or(`site_id.is.null,site_id.eq.${PK_SITE_ID}`)
      .eq("status", "published")
      .is("deleted_at", null)
      .maybeSingle();

    if (data) return data as Post;

    return fallbackPKPosts.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.warn("[getPKPostBySlug] Exception:", err);
    return fallbackPKPosts.find((p) => p.slug === slug) || null;
  }
}

export async function getRelatedPKPosts(currentSlug: string): Promise<Post[]> {
  const all = await getPKPosts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, 3);
}
