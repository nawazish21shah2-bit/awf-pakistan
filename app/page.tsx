import { PKHeroSlider } from "@/components/pk/home/PKHeroSlider";
import { PKImpactStats } from "@/components/pk/home/PKImpactStats";
import { PKHomeProjects } from "@/components/pk/home/PKHomeProjects";
import { PKWhyChooseUs } from "@/components/pk/home/PKWhyChooseUs";
import { PKFeaturedProject } from "@/components/pk/home/PKFeaturedProject";
import { PKHomeBlog } from "@/components/pk/home/PKHomeBlog";
import { PKTestimonials } from "@/components/pk/home/PKTestimonials";
import { PKHomeFaqs } from "@/components/pk/home/PKHomeFaqs";
import { PKDonationBanner } from "@/components/pk/home/PKDonationBanner";
import {
  getPKImpactStats,
  getPKPrograms,
  getPKPosts,
  getPKFaqs,
} from "@/lib/queries";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const [stats, programs, posts, faqs] = await Promise.all([
    getPKImpactStats(),
    getPKPrograms(),
    getPKPosts(),
    getPKFaqs(),
  ]);

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      {/* 1. Dynamic Hero Slider */}
      <PKHeroSlider />

      {/* 2. Elevated Field Impact Stats Strip */}
      <PKImpactStats stats={stats} />

      {/* 3. Active Field Programs in Pakistan Grid */}
      <PKHomeProjects programs={programs} />

      {/* 4. Four Core Governance & Trust Pillars */}
      <PKWhyChooseUs />

      {/* 5. Featured Initiative Spotlight (New Beginnings Project) */}
      <PKFeaturedProject />

      {/* 6. Stories of Hope & Ground Field Dispatches */}
      <PKHomeBlog posts={posts} />

      {/* 7. Verified Beneficiary & Donor Testimonials */}
      <PKTestimonials />

      {/* 8. Top FAQs & Accordion */}
      <PKHomeFaqs faqs={faqs} />

      {/* 9. High-Conversion Zakat & Direct Giving CTA Banner */}
      <PKDonationBanner />
    </div>
  );
}
