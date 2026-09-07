import type { Metadata } from "next";
import { Manrope, Fraunces, Noto_Nastaliq_Urdu } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import { PKAnnouncementBar } from "@/components/pk/layout/PKAnnouncementBar";
import { PKHeader } from "@/components/pk/layout/PKHeader";
import { PKFooter } from "@/components/pk/layout/PKFooter";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-noto-urdu",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arrahman Welfare Foundation Pakistan | Zakat, Food, Education & Emergency Relief",
    template: "%s — AWF Pakistan",
  },
  description: "Arrahman Welfare Foundation Pakistan is a transparent, registered welfare organization fighting poverty through Zakat-eligible food support, marriage kits, education scholarships, and clean water.",
  keywords: [
    "AWF Pakistan",
    "Arrahman Welfare Foundation Pakistan",
    "Charity in Pakistan",
    "Zakat Pakistan",
    "Sadaqah Pakistan",
    "New Beginnings Marriage Support",
    "Clean Water Pakistan",
    "Food Packages Pakistan",
    "Education Scholarships",
    "SECP Registered NGO"
  ],
  metadataBase: new URL("https://arrahmanwelfare.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://arrahmanwelfare.org",
    siteName: "Arrahman Welfare Foundation Pakistan",
    title: "Arrahman Welfare Foundation Pakistan | Delivering Hope & Dignity",
    description: "Zakat-eligible humanitarian aid, food packages, student scholarships, and clean water across deserving districts in Pakistan.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Arrahman Welfare Foundation Pakistan",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${manrope.variable} ${fraunces.variable} ${notoUrdu.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased text-foreground bg-background">
        <I18nProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary"
          >
            Skip to content
          </a>
          <PKAnnouncementBar />
          <PKHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <PKFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
