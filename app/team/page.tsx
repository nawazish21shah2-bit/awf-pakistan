import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, ShieldCheck, Heart, Sparkles, ArrowRight, CheckCircle2, User } from "lucide-react";
import { getPKTeam } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Our Leadership & Field Team | AWF Pakistan",
  description: "Meet the executive governance board, directors, and ground volunteer coordinators behind Arrahman Welfare Foundation Pakistan.",
};

const TEAM_IMAGES: Record<string, string> = {
  "abdul-hafeez-khan": "/images/awfca/team/abdul-hafeez-khan.png",
  "awais-riaz": "/images/awfca/team/awais-riaz.png",
  "humza-khan": "/images/awfca/team/imam-humza-khan.png",
  "imam-humza-khan": "/images/awfca/team/imam-humza-khan.png",
  "abdul-majid-sukhaira": "/images/awfca/team/abdul-majid-sukhaira.png",
  "ali-raza": "/images/awfca/team/ali-raza.png",
  "zian-ahmad": "/images/awfca/team/zian-ahmad.png",
};

export default async function TeamPage() {
  const teamMembers = await getPKTeam();

  // Split into Executive Leadership and Field Team / Volunteers
  const directors = teamMembers.filter(
    (m) => m.role?.toLowerCase().includes("director") || m.role?.toLowerCase().includes("founder") || m.role?.toLowerCase().includes("lead")
  );
  const coordinatorsAndVolunteers = teamMembers.filter(
    (m) => !directors.some((d) => d.id === m.id)
  );

  const resolveMemberImage = (m: { image_url?: string | null; slug?: string; name: string }) => {
    if (m.image_url && m.image_url.trim().length > 0) return m.image_url;
    if (m.slug && TEAM_IMAGES[m.slug]) return TEAM_IMAGES[m.slug];
    const key = m.name.toLowerCase().replace(/\s+/g, "-");
    return TEAM_IMAGES[key] || null;
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <section className="relative py-16 sm:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#242f45] to-primary opacity-95" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B10D13_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-soft px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Dedicated Leadership &amp; Field Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            The People Driving AWF Pakistan Forward
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Combining transparent international governance backed by AWF Canada with passionate, verified field coordinators across Pakistan.
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
              <li className="text-accent-soft font-bold">Our Team</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Team Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* Executive Governance & Leadership */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Governance</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary mt-1">
                Board of Directors &amp; Leadership
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted max-w-md">
              Guiding institutional compliance, strategic project allocations, and third-party audit verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((member) => {
              const imageSrc = resolveMemberImage(member);
              return (
                <article
                  key={member.id}
                  className="group bg-surface-warm p-3 rounded-[30px] border border-gray-200/80 shadow-soft hover:shadow-xl transition-all duration-350 flex flex-col hover:-translate-y-1.5 h-full"
                >
                  {/* Large Portrait Photo Frame (showing photos properly without clipping) */}
                  <div className="relative aspect-[1/0.95] w-full overflow-hidden rounded-[20px] bg-slate-200">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted/30">
                        <User className="w-20 h-20" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Body Content Box */}
                  <div className="p-5 sm:p-6 rounded-[20px] bg-white mt-3 flex-1 flex flex-col justify-between space-y-3 shadow-2xs">
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-xl text-primary group-hover:text-accent transition-colors leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                        {member.role}
                      </p>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1 line-clamp-3">
                        {member.bio ||
                          "Guiding charitable program delivery, audit rigor, and community relief across Pakistan."}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Executive Board Member</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Coordinators & Field Volunteers */}
        {coordinatorsAndVolunteers.length > 0 && (
          <section className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>On-Ground Network</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary mt-1">
                  Program Coordinators &amp; Dedicated Volunteers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted max-w-md">
                Managing direct food distribution, wedding package delivery, and field verification in remote districts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coordinatorsAndVolunteers.map((member) => {
                const imageSrc = resolveMemberImage(member);
                return (
                  <article
                    key={member.id}
                    className="group bg-surface-warm p-3 rounded-[30px] border border-gray-200/80 shadow-soft hover:shadow-xl transition-all duration-350 flex flex-col hover:-translate-y-1.5 h-full"
                  >
                    <div className="relative aspect-[1/0.95] w-full overflow-hidden rounded-[20px] bg-slate-200">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted/30">
                          <User className="w-20 h-20" />
                        </div>
                      )}

                      <div className="absolute top-3 left-3">
                        <span className="bg-primary/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 rounded-[20px] bg-white mt-3 flex-1 flex flex-col justify-between space-y-3 shadow-2xs">
                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-xl text-primary group-hover:text-accent transition-colors leading-snug">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                          {member.role}
                        </p>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1 line-clamp-3">
                          {member.bio ||
                            "Supporting field missions, beneficiary registration, and community outreach campaigns."}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Verified Team Member</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Join Our Volunteer Network CTA */}
        <section className="bg-primary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-soft inline-block bg-accent/20 px-3 py-1 rounded-full">
              Volunteer With AWF Pakistan
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
              Want to Join Our On-Ground Mission in Pakistan?
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              We welcome doctors, engineers, educators, and passionate youth volunteers across all provinces to assist with field aid delivery, student mentoring, and emergency response.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-6 py-3.5 rounded-full shadow-glow transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <span>Apply as a Volunteer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-sm"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support the Field Team</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
