import { PKHeroSlider } from "@/components/pk/home/PKHeroSlider";
import { PKImpactStats } from "@/components/pk/home/PKImpactStats";
import { PKProgramsSection } from "@/components/pk/home/PKProgramsSection";
import { PKInternationalBridge } from "@/components/pk/home/PKInternationalBridge";
import { PKHomeAbout } from "@/components/pk/home/PKHomeAbout";
import { PKWhyChooseUs } from "@/components/pk/home/PKWhyChooseUs";
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

      {/* 3. About Us Section */}
      <PKHomeAbout />

      {/* 4. Four Core Governance & Trust Pillars */}
      <PKWhyChooseUs />

      {/* 5. Social Welfare & Community Support Programs */}
      <PKProgramsSection programs={programs} />

      {/* 6. International Bridge of Hope */}
      <PKInternationalBridge />

      {/* 7. Stories of Hope & Ground Field Dispatches */}
      <PKHomeBlog posts={posts} />

      {/* 8. Verified Beneficiary & Donor Testimonials */}
      <PKTestimonials />

      {/* 9. Top FAQs & Accordion */}
      <PKHomeFaqs faqs={faqs} />

      {/* 10. High-Conversion Zakat & Direct Giving CTA Banner */}
      <PKDonationBanner />
    </div>
  );
}
