import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PKPageHeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
  showLogoBackground?: boolean;
}

export function PKPageHero({
  badge,
  title,
  description,
  breadcrumbs,
  children,
  className = "",
  showLogoBackground = false,
}: PKPageHeroProps) {
  return (
    <section
      className={`relative py-16 sm:py-24 bg-primary text-white overflow-hidden ${className}`}
    >
      {/* Background glow and subtle brand pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#242f45] to-primary opacity-90 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Logo Background */}
      {/* {showLogoBackground && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="relative w-96 h-96">
            <Image
              src="/images/awf-logo.png"
              alt="AWF Pakistan Logo Background"
              fill
              className="object-contain"
              sizes="384px"
            />
          </div>
        </div>
      )} */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(177,13,19,0.3)]" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>

        {description && (
          <div className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {typeof description === "string" ? <p>{description}</p> : description}
          </div>
        )}

        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 flex-wrap">
              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span>&bull;</span>}
                    {item.href && !isLast ? (
                      <li>
                        <Link
                          href={item.href}
                          className="hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ) : (
                      <li className={isLast ? "text-accent" : ""}>
                        {item.label}
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </nav>
        )}

        {children && <div className="pt-4">{children}</div>}
      </div>
    </section>
  );
}
