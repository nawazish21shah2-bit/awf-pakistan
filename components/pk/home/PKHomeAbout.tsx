import Image from "next/image";
import Link from "next/link";
import { Target, Eye, ArrowRight, Heart } from "lucide-react";

export function PKHomeAbout() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side - Images Grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/awfca/home/food-bank.jpg"
                    alt="Food bank distribution"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/awfca/home/education.jpg"
                    alt="Education support"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/awfca/home/clean-water.jpg"
                    alt="Clean water project"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/awfca/home/new-beginnings.jpg"
                    alt="Wedding assistance program"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(177,13,19,0.3)]" />
                <span>Who We Are</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary leading-tight">
                Fighting Poverty with Compassion and Sustainable Support
              </h2>
              <p className="text-muted text-base sm:text-lg leading-relaxed">
                Arrahman Welfare Foundation Pakistan is dedicated to transforming lives through scholar-verified, 100% Zakat-compliant welfare programs. We deliver essential food security, marriage assistance for underprivileged daughters, clean drinking water plants, student scholarships, and emergency relief across 24+ districts in Pakistan.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 space-y-4 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors">Our Mission</h3>
                <p className="text-muted text-sm leading-relaxed">
                  To alleviate poverty and hunger across Pakistan by delivering transparent, accountable welfare programs that empower vulnerable families to break the cycle of generational poverty.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 space-y-4 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors">Our Vision</h3>
                <p className="text-muted text-sm leading-relaxed">
                  A thriving Pakistan where every family has access to basic necessities, every child receives quality education, and vulnerable individuals are treated with dignity and respect.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-deep text-white font-bold px-8 py-4 rounded-full shadow-glow transition-all hover:scale-105 text-sm sm:text-base"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}