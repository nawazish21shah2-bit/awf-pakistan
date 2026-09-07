import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import type { Program } from "@/types/cms";
import { resolveProjectImage } from "@/lib/images";
import { featuredProject } from "@/data/pk/home";

interface PKProgramsSectionProps {
  programs: Program[];
}

export function PKProgramsSection({ programs }: PKProgramsSectionProps) {
  const displayPrograms = programs.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Social Welfare & Community Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight">
            Active Programs in Pakistan
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Every project is 100% Zakat-eligible, scholar-supervised, and delivered directly to certified destitute families across Pakistan.
          </p>
        </div>

        {/* Featured Initiative - Prominent Display */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 hover:shadow-2xl transition-all duration-300">
          {/* Card Header Info */}
          <div className="p-6 sm:px-10 sm:pt-8 pb-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Initiative</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-muted px-2 py-1 bg-gray-100 rounded-md">
                {featuredProject.category}
              </span>
            </div>
            <span className="text-xs font-semibold text-accent flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-accent" /> 100% Zakat Eligible
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Showcase */}
            <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[400px] bg-slate-950 overflow-hidden">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Text & CTA Section */}
            <div className="p-6 sm:p-10 space-y-6 flex flex-col justify-center">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                  {featuredProject.title}
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {featuredProject.summary}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs sm:text-sm font-bold text-primary">
                  <span>Raised: <span className="text-accent">{featuredProject.raisedAmount}</span></span>
                  <span className="text-muted">Goal: {featuredProject.goalAmount}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-1000"
                    style={{ width: `${featuredProject.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-muted">
                  {featuredProject.progressPercent}% of target reached across target districts in Punjab & Sindh.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/donate?project=new-beginnings-program"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3.5 rounded-full shadow-glow transition-all hover:scale-105 active:scale-95 text-sm flex-1"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Sponsor a Wedding Kit</span>
                </Link>

                <Link
                  href={featuredProject.href}
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-primary font-semibold px-6 py-3.5 rounded-full transition-colors text-sm flex-1"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Programs Grid */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary">
              More Active Programs
            </h3>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-deep transition-colors group"
            >
              <span>View All Programs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPrograms.map((program) => {
              const imageSrc = resolveProjectImage(
                program.image_url || program.featured_image_url,
                program.slug,
                program.category
              );
              const summaryText = Array.isArray(program.summary)
                ? program.summary[0]
                : program.summary || "";

              return (
                <div
                  key={program.id || program.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[16/11] bg-gray-900 overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badge: Category */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
                        {program.category || "Field Program"}
                      </span>
                    </div>

                    {/* Top Right: Zakat Eligible */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-md text-accent text-xs font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-accent" />
                        <span>Zakat Eligible</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                        <Link href={`/projects/${program.slug}`}>
                          {program.title}
                        </Link>
                      </h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-3">
                        {summaryText}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/donate?project=${program.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-accent hover:bg-accent-deep text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all flex-1 hover:scale-105 active:scale-95"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Donate</span>
                      </Link>

                      <Link
                        href={`/projects/${program.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-primary font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex-1"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}