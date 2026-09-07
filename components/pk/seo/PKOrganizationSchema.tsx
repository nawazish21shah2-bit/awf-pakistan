export function PKOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Arrahman Welfare Foundation Pakistan",
    "alternateName": "AWF Pakistan",
    "url": "https://arrahmanwelfare.org",
    "logo": "https://arrahmanwelfare.org/images/logo-awfca.png",
    "description": "Registered welfare organization in Pakistan providing Zakat-eligible food aid, educational scholarships, marriage support, and clean water.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office # 4B, Sector F-8/3",
      "addressLocality": "Islamabad",
      "addressCountry": "PK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-300-0000000",
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
