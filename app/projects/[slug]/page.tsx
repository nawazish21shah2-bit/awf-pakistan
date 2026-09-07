import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ShieldCheck, Folder, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { getPKProgramBySlug, getRelatedPKPrograms, getPKPrograms } from "@/lib/queries";
import { resolveProjectImage } from "@/lib/images";
import { PKProgramGallery } from "@/components/pk/projects/PKProgramGallery";
import { programGalleries } from "@/data/pk/program-galleries";
import { pkSite } from "@/data/pk/site";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  try {
    const programs = await getPKPrograms();
    return programs.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getPKProgramBySlug(params.slug);
  if (!project) return { title: "Project Details | AWF Pakistan" };

  const summaryText = Array.isArray(project.summary)
    ? project.summary[0]
    : typeof project.summary === "string"
    ? project.summary
    : "Explore AWF Pakistan welfare programs.";

  return {
    title: `${project.title} | AWF Pakistan`,
    description: summaryText,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getPKProgramBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedPKPrograms(project.slug, project.category);

  // Extract body content and paragraphs
  const body = (project.body || {}) as any;
  const contentParagraphs: string[] =
    Array.isArray(body?.content) && body.content.length > 0
      ? body.content
      : Array.isArray(project.summary)
      ? project.summary
      : typeof project.summary === "string"
      ? [project.summary]
      : ["Dedicated to providing essential resources and sustainable support to deserving families across Pakistan."];

  const contentHtml = body?.contentHtml || null;
  const tags: string[] =
    Array.isArray(body?.tags) && body.tags.length > 0
      ? body.tags
      : ["100% Zakat Eligible", "Direct Ground Delivery", "Shariah Compliant", "Verified Beneficiaries"];

  const statusBadge = body?.status_badge || "Active Initiative";

  // Extract gallery images from body or fallback
  const rawGallery =
    Array.isArray(body?.gallery) && body.gallery.length > 0
      ? body.gallery
      : programGalleries[project.slug] || [];
  const galleryImages: string[] = rawGallery
    .map((item: any) => (typeof item === "string" ? item : item?.image_url))
    .filter(Boolean);

  const heroImage = resolveProjectImage(
    project.featured_image_url || project.image_url,
    project.slug,
    project.category
  );

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header with Dynamic Background */}
      <section className="relative py-16 sm:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-[#1b2436]/90 to-primary/95 z-10" />
        <Image
          src={heroImage}
          alt={project.title}
          fill
          className="object-cover opacity-20"
          priority
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-accent font-bold text-xs uppercase tracking-widest">
            AWF Pakistan Field Initiatives
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {project.title}
          </h1>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>&bull;</li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>&bull;</li>
              <li className="text-accent-soft font-bold truncate max-w-xs sm:max-w-md">
                {project.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main 2-Column Detail Layout */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Images & Photo Gallery (5 cols on Desktop) */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-gray-200/80 shadow-soft group">
              <Image
                src={heroImage}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-primary/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {statusBadge}
                </span>
              </div>
            </div>

            {/* Interactive Photo Gallery with Lightbox */}
            {galleryImages.length > 0 && (
              <PKProgramGallery title={project.title} images={galleryImages} />
            )}
          </div>

          {/* Column 2: Content, Tags & Glassmorphic CTA Box (7 cols on Desktop) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Header Eyebrow & Badges */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full">
                  <Folder className="w-3.5 h-3.5" />
                  <span>{project.category || "Social Welfare"}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Zakat Eligible</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary leading-tight">
                {project.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-primary border border-gray-200/80 shadow-2xs px-3 py-1 rounded-full"
                  >
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Content Narrative */}
            <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-soft">
              {contentHtml ? (
                <div
                  className="prose prose-slate max-w-none text-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : (
                <div className="space-y-4">
                  {contentParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Redesigned Glassmorphic / Accent CTA Box (matching Canadian layout) */}
            <div className="bg-primary text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden border border-white/10">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-accent-soft block">
                  Direct Field Impact
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Support This Project
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Your donation delivers direct on-ground aid with full transparency and verified beneficiary delivery across Pakistan.
                </p>
              </div>

              {/* Trust checklist */}
              <div className="relative space-y-2.5 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Donation Transparency &amp; Audit Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Delivery to Verified Beneficiaries</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zakat &amp; Sadaqah Eligible Campaign</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/donate?project=${project.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold py-3.5 px-6 rounded-full shadow-glow text-sm transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Project</span>
                </Link>

                <a
                  href={pkSite.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-full text-xs shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Related Projects Section (Bottom) */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-gray-200 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  More from AWF Pakistan
                </p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary mt-1">
                  Related Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:text-primary transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedProjects.map((rel) => {
                const relImage = resolveProjectImage(
                  rel.image_url || rel.featured_image_url,
                  rel.slug,
                  rel.category
                );

                return (
                  <article
                    key={rel.slug}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                      <Link href={`/projects/${rel.slug}`} className="block w-full h-full">
                        <Image
                          src={relImage}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </Link>
                      <span className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <h3 className="font-display font-bold text-base text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                        <Link href={`/projects/${rel.slug}`}>{rel.title}</Link>
                      </h3>

                      <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                        <Link
                          href={`/projects/${rel.slug}`}
                          className="inline-flex items-center justify-center text-[11px] font-bold text-primary bg-gray-100 hover:bg-gray-200 py-2 rounded-full transition-colors text-center"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/donate?project=${rel.slug}`}
                          className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-white bg-accent hover:bg-accent-deep py-2 rounded-full transition-colors text-center"
                        >
                          <Heart className="w-3 h-3 fill-white" />
                          <span>Donate</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

