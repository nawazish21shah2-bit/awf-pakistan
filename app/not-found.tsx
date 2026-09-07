import Link from "next/link";
import { Home, Folder, Heart, FileText, ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fafbfc] px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl">
        {/* Visual Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent/10 text-accent mx-auto">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        {/* Heading & Notice */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-accent block">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary">
            Looking for something specific?
          </h1>
          <p className="text-xs font-urdu text-muted">
            صفحہ دستیاب نہیں ہے — براہ کرم درج ذیل لنکس کا استعمال کریں۔
          </p>
          <p className="text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
            The page or report you are looking for might have been moved, renamed, or is currently undergoing updates.
          </p>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          <Link
            href="/"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-accent hover:bg-accent/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block group-hover:text-accent transition-colors">
                Return to Home
              </span>
              <span className="text-[11px] text-muted">Explore our main overview</span>
            </div>
          </Link>

          <Link
            href="/projects"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-accent hover:bg-accent/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block group-hover:text-accent transition-colors">
                Our Field Projects
              </span>
              <span className="text-[11px] text-muted">View active welfare initiatives</span>
            </div>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-accent hover:bg-accent/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-primary block group-hover:text-accent transition-colors">
                Field Stories &amp; News
              </span>
              <span className="text-[11px] text-muted">Read dispatches from the ground</span>
            </div>
          </Link>

          <Link
            href="/donate"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent hover:text-white transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center group-hover:bg-white group-hover:text-accent transition-colors">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xs font-bold text-accent group-hover:text-white block transition-colors">
                Donate to Pakistan
              </span>
              <span className="text-[11px] text-muted group-hover:text-white/80">Support Zakat &amp; relief aid</span>
            </div>
          </Link>
        </div>

        {/* Return Button */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-soft text-white text-xs font-bold px-6 py-3 rounded-full transition-colors shadow-md"
          >
            <span>Back to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-accent transition-colors"
          >
            <span>Need Help? Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
