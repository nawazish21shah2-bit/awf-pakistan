import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";
import { getPKPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Field Stories & News | Arrahman Welfare Foundation Pakistan",
  description: "Read the latest updates, field stories, and community impact reports from Arrahman Welfare Foundation across Pakistan.",
};

type Props = {
  searchParams?: { tag?: string };
};

export default async function BlogPage({ searchParams }: Props) {
  const selectedTag = searchParams?.tag;
  const allPosts = await getPKPosts();

  // Extract all distinct tags dynamically
  const allTags = Array.from(
    new Set(
      allPosts.flatMap((p) => {
        const bodyTags = (p.body as any)?.tags || [];
        const rootTags = p.tags || [];
        return [...bodyTags, ...rootTags];
      })
    )
  ).filter(Boolean);

  // Filter posts by tag if selected
  const filteredPosts = selectedTag
    ? allPosts.filter((p) => {
        const postTags = [...((p.body as any)?.tags || []), ...(p.tags || [])];
        return postTags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
      })
    : allPosts;

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#222d42] to-primary opacity-95" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Field Dispatches &amp; Community Voices</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            {selectedTag ? `Stories in "${selectedTag}"` : "Stories of Impact & Field Updates"}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Follow our ground relief campaigns, emergency responses, and stories of real families whose lives were transformed across Pakistan.
          </p>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>&bull;</li>
              <li>
                <Link href="/blog" className={!selectedTag ? "text-accent font-bold" : "hover:text-white transition-colors"}>
                  Field Stories
                </Link>
              </li>
              {selectedTag && (
                <>
                  <li>&bull;</li>
                  <li className="text-accent font-bold">{selectedTag}</li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Tag Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          <Link
            href="/blog"
            className={`inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              !selectedTag
                ? "bg-accent text-white shadow-glow"
                : "bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent"
            }`}
          >
            All Stories ({allPosts.length})
          </Link>

          {allTags.map((tag) => {
            const count = allPosts.filter((p) => {
              const tags = [...((p.body as any)?.tags || []), ...(p.tags || [])];
              return tags.some((t) => t.toLowerCase() === tag.toLowerCase());
            }).length;

            const isActive = selectedTag?.toLowerCase() === tag.toLowerCase();

            return (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-accent text-white shadow-glow"
                    : "bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent"
                }`}
              >
                <span>{tag}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-muted"}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Featured Story Hero Card (if available and viewing all or filtered) */}
        {featuredPost && (
          <article className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-soft hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-7 overflow-hidden bg-slate-900">
              <Image
                src={featuredPost.image_url || "/images/awfca/home/testimonials.jpg"}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Story</span>
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-muted font-semibold">
                  <span className="flex items-center gap-1 text-accent">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent Dispatch"}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>4 min read</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all hover:scale-105"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Stories Grid */}
        {remainingPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => {
              const postTags = (post.body as any)?.tags || post.tags || [];
              const primaryTag = postTags[0] || "Field Update";

              return (
                <article
                  key={post.slug}
                  className="group bg-white rounded-[22px] overflow-hidden border border-gray-200/80 shadow-[0_18px_50px_rgba(27,36,54,0.07)] hover:shadow-[0_22px_48px_rgba(27,36,54,0.12)] transition-all duration-350 flex flex-col h-full hover:-translate-y-1"
                >
                  {/* Image with 16/11 aspect ratio matching Canadian site */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                    <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                      <Image
                        src={post.image_url || "/images/awfca/home/testimonials.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {primaryTag}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold tracking-wider text-accent uppercase block">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent Dispatch"}
                      </span>

                      <h3 className="font-display font-semibold text-xl text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2 min-h-[54px]">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-muted leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-5 mt-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-accent hover:border-accent hover:text-white text-primary font-bold text-xs transition-all shadow-2xs group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
            <BookOpen className="w-12 h-12 text-accent/50 mx-auto" />
            <h3 className="text-xl font-bold text-primary">No stories found</h3>
            <p className="text-sm text-muted">No dispatches found under this filter. View all published articles.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm"
            >
              View All Stories
            </Link>
          </div>
        ) : null}

      </div>
    </div>
  );
}
