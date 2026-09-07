/**
 * Centralized Image & Asset Management System for AWF Pakistan
 * Handles resolution of Supabase storage URLs, local project assets, and curated fallback stock images.
 */

export const PROJECT_IMAGES: Record<string, string> = {
  // New Beginnings Marriage Support
  "new-beginnings-program": "/images/awfca/projects/new-beginnings.jpg",
  "new-beginnings": "/images/awfca/projects/new-beginnings.jpg",
  "collective-wedding-program": "/images/awfca/projects/new-beginnings.jpg",

  // Clean Water & Filtration
  "clean-water-project": "/images/awfca/projects/clean-water.webp",
  "clean-water": "/images/awfca/projects/clean-water.webp",

  // Food Support & Ration Hamper
  "food-bank": "/images/awfca/projects/food-bank.jpg",
  "emergency-food-support": "/images/awfca/projects/food-bank.jpg",
  "ramadan-hamper": "/images/awfca/projects/ramadan-hamper.jpg",

  // Orphan Care
  "orphan-support-project": "/images/awfca/projects/orphan-support.jpg",
  "orphan-support": "/images/awfca/projects/orphan-support.jpg",
  "orphan-sponsorship-care": "/images/awfca/projects/orphan-support.jpg",

  // Education & Scholarships
  "student-scholarship-breaking-barriers-building-futures": "/images/awfca/projects/student-scholarship.jpg",
  "student-scholarship-program": "/images/awfca/projects/student-scholarship.jpg",
  "student-scholarship": "/images/awfca/projects/student-scholarship.jpg",

  // Skills & Computer Training
  "computer-training-institute": "/images/awfca/projects/computer-training.jpg",
  "vocational-skills-training": "/images/awfca/projects/computer-training.jpg",

  // Health & Medical
  "free-medical-dispensary": "/images/awfca/projects/medical-dispensary.jpg",
  "mobile-health-unit": "/images/awfca/projects/mobile-health.jpg",

  // Religious Giving & Relief
  "emergency-relief-fund": "/images/awfca/projects/emergency-relief.jpg",
  "sadaqah-tul-fitr": "/images/awfca/projects/sadaqah-fitr.jpg",
  "zakaat-fund": "/images/awfca/projects/zakaat.jpg",
  "fidyaa": "/images/awfca/projects/fidyaa.webp",
  "collective-qurbani-project": "/images/awfca/projects/qurbani.jpg",
  "eid-gift-hampers": "/images/awfca/projects/eid-gifts.jpg",
  "gaza-dignity-kits": "/images/awfca/projects/gaza-dignity-kits.jpg",
  "helping-hands-campaign": "/images/awfca/projects/helping-hands.jpg",
};

export const CATEGORY_STOCK_IMAGES: Record<string, string> = {
  "Social Welfare": "/images/awfca/projects/new-beginnings.jpg",
  "Education": "/images/awfca/projects/student-scholarship.jpg",
  "Education & Skills": "/images/awfca/projects/computer-training.jpg",
  "Humanitarian Aid": "/images/awfca/projects/food-bank.jpg",
  "Religious Giving": "/images/awfca/projects/zakaat.jpg",
  "Clean Water": "/images/awfca/projects/clean-water.webp",
  "Health & Medical": "/images/awfca/projects/medical-dispensary.jpg",
  "Default": "/images/awfca/projects/new-beginnings.jpg",
};

export function resolveProjectImage(
  firstArg?: string | null,
  secondArg?: string | null,
  category?: string
): string {
  // 1. Check if firstArg is a valid URL or path
  if (firstArg && typeof firstArg === "string") {
    const trimmed = firstArg.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
      return trimmed;
    }
    if (PROJECT_IMAGES[trimmed]) {
      return PROJECT_IMAGES[trimmed];
    }
  }

  // 2. Check if secondArg is a valid URL or known slug
  if (secondArg && typeof secondArg === "string") {
    const trimmed = secondArg.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
      return trimmed;
    }
    if (PROJECT_IMAGES[trimmed]) {
      return PROJECT_IMAGES[trimmed];
    }
  }

  // 3. Category fallback
  if (category && CATEGORY_STOCK_IMAGES[category]) {
    return CATEGORY_STOCK_IMAGES[category];
  }

  return CATEGORY_STOCK_IMAGES.Default;
}
