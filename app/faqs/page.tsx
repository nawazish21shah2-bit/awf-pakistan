import { Metadata } from "next";
import { getPKFaqs, getPKFaqCategories } from "@/lib/queries";
import { PKFaqAccordion } from "@/components/pk/faqs/PKFaqAccordion";
import { PKPageHero } from "@/components/pk/layout/PKPageHero";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Arrahman Welfare Foundation Pakistan",
  description:
    "Get clear, verified answers regarding Zakat eligibility, foreign currency contributions, SECP compliance, project governance, and tax deduction receipts in Pakistan.",
  openGraph: {
    title: "Frequently Asked Questions | AWF Pakistan",
    description:
      "Frequently asked questions regarding Zakat policies, tax receipts, donation channels, and charity governance in Pakistan.",
  },
};

export default async function FaqsPage() {
  const [faqs, categories] = await Promise.all([
    getPKFaqs(),
    getPKFaqCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Page Hero Header */}
      <PKPageHero
        badge="Got Questions? We Have Answers"
        title="Frequently Asked Questions"
        description="Find clear answers to common questions about our welfare projects, 100% Zakat compliance, donation methods, and governance standards in Pakistan."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <PKFaqAccordion initialFaqs={faqs} categories={categories} />
      </main>
    </div>
  );
}
