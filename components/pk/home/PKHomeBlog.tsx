import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import type { Post } from "@/types/cms";

interface PKHomeBlogProps {
  posts: Post[];
}

export function PKHomeBlog({ posts }: PKHomeBlogProps) {
  const displayPosts = posts.slice(0, 3);
  if (displayPosts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[#fafbfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ground Updates</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">
              Stories from the Field
            </h2>
            <p className="text-muted text-sm sm:text-base md:text-lg leading-relaxed">
              Read transparent reports, ground stories, and testimonies from vulnerable families whose lives have been transformed.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-deep transition-colors shrink-0 group self-start md:self-end"
          >
            <span>Read All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => {
            const formattedDate = post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";

            const imageSrc = post.image_url || "/images/awfca/home/hero-bg-image-silver.jpg";

            return (
              <div
                key={post.id || post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/11] bg-gray-900 overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-accent" />
                      <span>{formattedDate}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-accent group-hover:text-accent-deep">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span>Read Full Report</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
