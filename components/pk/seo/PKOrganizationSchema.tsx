import { pkSite } from "@/data/pk/site";

export function PKOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Arrahman Welfare Foundation Pakistan",
    "alternateName": "AWF Pakistan",
    "url": "https://awf-pakistan.vercel.app",
    "logo": "https://awf-pakistan.vercel.app/images/awf-logo.png",
    "description": "Registered welfare organization in Pakistan (Reg. No. PB-7811715682944788) providing Zakat-eligible food aid, educational scholarships, marriage support, and clean water.",
    "identifier": "PB-7811715682944788",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7-EIDGAH MARKET, KETCHEHRI ROAD, SADIQABAD",
      "addressLocality": "Rahim Yar Khan",
      "addressRegion": "Sadiqabad",
      "addressCountry": "PK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@arrahmanwelfare.org",
      "telephone": pkSite.phone,
      "contactType": "donor support",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/share/18oiZKSqE1/",
      "https://www.instagram.com/_awfca_/",
      "https://www.youtube.com/@ArrahmanWelfareFoundation"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
