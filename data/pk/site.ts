export const pkSite = {
  name: "Arrahman Welfare Foundation Pakistan",
  shortName: "AWF Pakistan",
  legalStatus: "Registered Non-Profit Organization under SECP / Voluntary Social Welfare Agencies Act",
  secpReg: "SECP License No. [SECP-PK-AWF-XXXXX]",
  fbrNtn: "FBR NTN: [XXXXXXX-X]",
  tagline: "Building a Brighter, Resilient Future for Those in Need",
  urduTagline: "ضرورت مند خاندانوں کے لیے ایک روشن اور باوقار مستقبل کی تعمیر۔",
  phone: "+92 300 0000000",
  phoneDisplay: "+92 (300) 000-0000",
  phoneHref: "tel:+923000000000",
  whatsapp: "+92 300 0000000",
  whatsappHref: "https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20would%20like%20to%20donate%20to%20AWF%20Pakistan.",
  gulfWhatsapp: "+971 50 0000000",
  gulfWhatsappHref: "https://wa.me/971500000000?text=Assalam-o-Alaikum%2C%20I%20am%20donating%20from%20the%20Gulf%20region%20for%20AWF%20Pakistan.",
  email: "pakistan@arrahmanwelfare.org",
  supportEmail: "info@arrahmanwelfare.org",
  address: "Office # 4B, Sector F-8/3, Islamabad, Pakistan (Placeholder)",
  description: "Arrahman Welfare Foundation Pakistan delivers Zakat-eligible food aid, educational scholarships, healthcare support, and clean water across deserving districts in Pakistan. Backed by AWF Canada.",
  copyright: `© ${new Date().getFullYear()} Arrahman Welfare Foundation Pakistan. All rights reserved.`,
};

export const mainNav = [
  { labelKey: "nav.home", href: "/" },
  {
    labelKey: "nav.about",
    href: "/about",
    children: [
      { labelKey: "nav.about", href: "/about" },
      { labelKey: "nav.team", href: "/team" },
      { labelKey: "nav.faqs", href: "/faqs" },
      { labelKey: "nav.reports", href: "/reports" },
    ],
  },
  {
    labelKey: "nav.projects",
    href: "/projects",
    children: [
      { label: "Humanitarian Aid", href: "/projects?category=humanitarian-aid" },
      { label: "Education & Skills Development", href: "/projects?category=educational-skills" },
      { label: "Social Welfare & Community Support", href: "/projects?category=social-welfare" },
      { label: "Religious & Charitable Giving", href: "/projects?category=religious-giving" },
    ],
  },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.reports", href: "/reports" },
  { labelKey: "nav.faqs", href: "/faqs" },
  { labelKey: "nav.contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects in Pakistan", href: "/projects" },
  { label: "Field Stories & News", href: "/blog" },
  { label: "Our Team", href: "/team" },
  { label: "Reports & Audits", href: "/reports" },
  { label: "Donate", href: "/donate" },
];

export const footerServices = [
  { label: "Emergency Food & Relief", href: "/projects?category=humanitarian-aid" },
  { label: "Student Scholarships", href: "/projects?category=educational-skills" },
  { label: "Clean Drinking Water", href: "/projects?category=humanitarian-aid" },
  { label: "Collective Weddings (New Beginnings)", href: "/projects?category=social-welfare" },
  { label: "Religious & Zakat Giving", href: "/projects?category=religious-giving" },
];

export const footerSupport = [
  { label: "Frequently Asked Questions", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Donation Policy", href: "/donation-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/18oiZKSqE1/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/_awfca_/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/@ArrahmanWelfareFoundation", icon: "youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@awfca.ca", icon: "tiktok" },
];
