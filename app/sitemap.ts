import { MetadataRoute } from "next";
import { getPKPrograms, getPKPosts } from "@/lib/queries";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://arrahmanwelfare.org";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/team",
    "/faqs",
    "/reports",
    "/contact",
    "/donate",
    "/payment-coming-soon",
    "/terms-and-conditions",
    "/privacy-policy",
    "/donation-policy",
    "/disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const [programs, posts] = await Promise.all([
      getPKPrograms(),
      getPKPosts(),
    ]);

    // Dynamic project routes
    const projectRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    // Dynamic blog routes
    const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
  } catch (err) {
    console.error("Error generating dynamic sitemap:", err);
    return staticRoutes;
  }
}
