import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Quote,
  CheckCircle2,
  Heart,
  MessageCircle,
  Folder,
} from "lucide-react";
import { getPKPostBySlug, getPKPosts, getRelatedPKPosts } from "@/lib/queries";
import { pkSite } from "@/data/pk/site";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  try {
    const posts = await getPKPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPKPostBySlug(params.slug);
  if (!post) return { title: "Story | AWF Pakistan" };

  return {
    title: `${post.title} | AWF Pakistan`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getPKPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPKPosts(post.slug);
  const body = (post.body || {}) as any;

  const openingParas: string[] = Array.isArray(body?.opening) ? body.opening : [];
  const mainParas: string[] = Array.isArray(body?.body)
    ? body.body
    : typeof body?.body === "string"
    ? [body.body]
    : [post.excerpt];

  const bullets: string[] = Array.isArray(body?.bullets) ? body.bullets : [];
  const quoteText = body?.quote || null;
  const sectionHeading = body?.heading || null;
  const headingText = body?.headingText || null;
  const tags: string[] = Array.isArray(body?.tags) && body.tags.length > 0 ? body.tags : post.tags || ["Field Story", "Pakistan Relief"];

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent Dispatch";

  const shareUrl = `https://arrahmanwelfare.org/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Dynamic Hero Header */}
      <section className="relative py-16 sm:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-[#1b2436]/90 to-primary/95 z-10" />
        {post.image_url && (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover opacity-15"
            priority
          />
        )}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-accent-soft uppercase tracking-wider">
            <span className="bg-accent/20 border border-accent/40 px-3 py-1 rounded-full">
              {tags[0] || "Impact Story"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-300 pt-2">
            <span className="flex items-center gap-1.5 text-accent-soft">
              <CalendarDays className="w-4 h-4" />
              <span>{publishedDate}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>4 min read</span>
            </span>
          </div>

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
                <Link href="/blog" className="hover:text-white transition-colors">
                  Field Stories
                </Link>
              </li>
              <li>&bull;</li>
              <li className="text-accent-soft font-bold truncate max-w-xs sm:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Main Story Column (8 cols) */}
          <article className="lg:col-span-8 space-y-8">
            
            {/* Featured Image */}
            {post.image_url && (
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-gray-200/80 shadow-soft">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 750px"
                />
              </div>
            )}

            {/* Content Body Container */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200/80 shadow-soft space-y-8">
              
              {/* Opening Paragraphs */}
              {openingParas.length > 0 && (
                <div className="space-y-4 text-base sm:text-lg text-primary font-medium leading-relaxed border-b border-gray-100 pb-6">
                  {openingParas.map((p, i) => (
                    <p key={`open-${i}`}>{p}</p>
                  ))}
                </div>
              )}

              {/* Blockquote callout if available */}
              {quoteText && (
                <div className="relative bg-surface rounded-2xl p-6 sm:p-8 border-l-4 border-accent space-y-3">
                  <Quote className="w-8 h-8 text-accent/30" />
                  <p className="font-display italic text-base sm:text-lg text-primary leading-relaxed">
                    &ldquo;{quoteText}&rdquo;
                  </p>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                    — AWF Pakistan Field Mission Note
                  </span>
                </div>
              )}

              {/* Section Heading & Heading Text */}
              {sectionHeading && (
                <div className="space-y-3 pt-2">
                  <h2 className="text-2xl font-display font-bold text-primary">
                    {sectionHeading}
                  </h2>
                  {headingText && (
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {headingText}
                    </p>
                  )}
                </div>
              )}

              {/* Main Narrative Paragraphs */}
              <div className="space-y-5 text-sm sm:text-base text-muted leading-relaxed">
                {mainParas.map((para, i) => (
                  <p key={`body-${i}`}>{para}</p>
                ))}
              </div>

              {/* Action / Takeaway Bullet Points */}
              {bullets.length > 0 && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Key Takeaways &amp; Impact Points</span>
                  </h3>
                  <ul className="space-y-3">
                    {bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags and Social Sharing Footer */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <Folder className="w-3.5 h-3.5 text-accent" /> Tags:
                  </span>
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="text-xs font-semibold bg-gray-100 hover:bg-accent hover:text-white text-primary px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" /> Share:
                  </span>
                  <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>

              </div>

            </div>
          </article>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Support Ground Operations CTA Card */}
            <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden border border-white/10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-accent-soft block">
                  Support This Mission
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Help Families Across Pakistan
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Your donation brings life-saving food hampers, clean water filtration, marriage assistance, and student scholarships to deserving families.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/donate"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold py-3.5 px-6 rounded-full shadow-glow text-sm transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to AWF Pakistan</span>
                </Link>

                <a
                  href={pkSite.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-full text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Contact Field Coordinators</span>
                </a>
              </div>
            </div>

            {/* Recent Dispatches / Related Stories in Sidebar */}
            {relatedPosts.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-soft space-y-4">
                <h4 className="font-display font-bold text-lg text-primary border-b border-gray-100 pb-3">
                  Recent Dispatches
                </h4>
                <div className="space-y-4">
                  {relatedPosts.map((rel) => (
                    <article key={rel.slug} className="group flex gap-3.5 items-center">
                      {rel.image_url && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                          <Image
                            src={rel.image_url}
                            alt={rel.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-accent">
                          {rel.published_at ? new Date(rel.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent"}
                        </span>
                        <h5 className="font-bold text-xs sm:text-sm text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                        </h5>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Back to All Stories Button */}
            <div className="text-center pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Field Stories</span>
              </Link>
            </div>

          </aside>

        </div>

        {/* Bottom Related Stories Grid */}
        {relatedPosts.length > 0 && (
          <div className="pt-16 border-t border-gray-200 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  Keep Reading
                </p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary mt-1">
                  More Stories of Impact
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-primary transition-colors"
              >
                <span>View All Stories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((rel) => (
                <article
                  key={rel.slug}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Link href={`/blog/${rel.slug}`} className="block w-full h-full">
                      <Image
                        src={rel.image_url || "/images/awfca/home/testimonials.jpg"}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </Link>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-accent">
                        {rel.published_at ? new Date(rel.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                      </span>
                      <h3 className="font-display font-bold text-base text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                    </div>

                    <Link
                      href={`/blog/${rel.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-accent transition-colors pt-2 border-t border-gray-100"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
