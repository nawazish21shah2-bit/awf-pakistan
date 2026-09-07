import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Folder, Heart, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { getPKPrograms } from "@/lib/queries";
import { resolveProjectImage } from "@/lib/images";
import { pkProgramCategories, resolvePKCategory } from "@/data/pk/program-categories";

export const metadata: Metadata = {
  title: "Our Projects & Field Initiatives | AWF Pakistan",
  description: "Explore Zakat-eligible humanitarian and welfare initiatives active across Pakistan, verified and delivered transparently on the ground.",
};

type Props = {
  searchParams?: { category?: string };
};

export default async function ProjectsPage({ searchParams }: Props) {
  const selectedCategoryQuery = searchParams?.category;
  const allProjects = await getPKPrograms();

  const activeCategory = resolvePKCategory(selectedCategoryQuery);

  // Filter projects accurately based on resolved category definition or fallback
  const filteredProjects = activeCategory
    ? allProjects.filter((p) => {
        const catLower = (p.category || "").toLowerCase();
        const matchesDbCategory = activeCategory.dbCategories.some(
          (db) => db.toLowerCase() === catLower
        );
        const matchesSlug = activeCategory.programSlugs.includes(p.slug);
        return matchesDbCategory || matchesSlug;
      })
    : selectedCategoryQuery
    ? allProjects.filter((p) => (p.category || "").toLowerCase() === selectedCategoryQuery.toLowerCase())
    : allProjects;

  const pageTitle = activeCategory
    ? `${activeCategory.label}`
    : selectedCategoryQuery
    ? `${selectedCategoryQuery} Programs`
    : "Our Projects & Field Programs";

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <section className="relative py-16 sm:py-20 bg-primary text-white overflow-hidden">
        {/* Background glow and subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#242f45] to-primary opacity-90" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Active Initiatives in Pakistan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering 100% Zakat-eligible aid, marriage support, clean water, orphan care, and education directly to verified families in need across Pakistan.
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
                <Link href="/projects" className={!activeCategory ? "text-accent font-bold" : "hover:text-white transition-colors"}>
                  Projects
                </Link>
              </li>
              {activeCategory && (
                <>
                  <li>&bull;</li>
                  <li className="text-accent font-bold">{activeCategory.shortLabel}</li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Filter Pills (matching Canadian site category nav) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-2">
          <Link
            href="/projects"
            className={`inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              !activeCategory && !selectedCategoryQuery
                ? "bg-accent text-white shadow-glow"
                : "bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent"
            }`}
          >
            All Projects ({allProjects.length})
          </Link>

          {pkProgramCategories.map((cat) => {
            const count = allProjects.filter((p) => {
              const catLower = (p.category || "").toLowerCase();
              return (
                cat.dbCategories.some((db) => db.toLowerCase() === catLower) ||
                cat.programSlugs.includes(p.slug)
              );
            }).length;

            const isActive = activeCategory?.id === cat.id;

            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-accent text-white shadow-glow"
                    : "bg-white text-primary border border-gray-200 hover:border-accent hover:text-accent"
                }`}
              >
                <span>{cat.shortLabel}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-muted"}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Projects Grid: 3 Columns on Desktop, 2 on Tablet, 1 on Mobile */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const summaryText = Array.isArray(project.summary)
                ? project.summary[0]
                : typeof project.summary === "string"
                ? project.summary
                : "";

              const body = project.body as any;
              const statusBadge = body?.status_badge || "Active Initiative";
              const coverImage = resolveProjectImage(
                project.image_url || project.featured_image_url,
                project.slug,
                project.category
              );

              return (
                <article
                  key={project.slug}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
                >
                  {/* Card Media Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                    <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                      <Image
                        src={coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    {/* Floating Status & Category Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-primary/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {statusBadge}
                      </span>
                      <span className="bg-accent/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Zakat</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
                        <Folder className="w-3.5 h-3.5" />
                        <span>{project.category || "Social Welfare"}</span>
                      </div>

                      <h2 className="font-display font-bold text-xl text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-muted leading-relaxed line-clamp-3">
                        {summaryText}
                      </p>
                    </div>

                    {/* Action Buttons (Dual Buttons: Learn More + Donate) */}
                    <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-primary font-bold text-xs py-2.5 px-3 rounded-full transition-colors text-center"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/donate?project=${project.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-accent hover:bg-accent-deep text-white font-bold text-xs py-2.5 px-3 rounded-full shadow-sm transition-all hover:scale-[1.02] active:scale-95 text-center"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Donate Now</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
            <h3 className="text-xl font-bold text-primary">No projects found in this category</h3>
            <p className="text-sm text-muted">Please select another category or view all active projects.</p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold"
            >
              View All Projects
            </Link>
          </div>
        )}

      </section>
    </div>
  );
}

