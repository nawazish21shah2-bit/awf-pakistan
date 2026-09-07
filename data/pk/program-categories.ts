export type ProgramCategoryId =
  | "humanitarian-aid"
  | "educational-skills"
  | "social-welfare"
  | "religious-giving";

export type ProgramCategory = {
  id: ProgramCategoryId;
  label: string;
  shortLabel: string;
  href: string;
  dbCategories: readonly string[];
  programSlugs: readonly string[];
};

export const pkProgramCategories: readonly ProgramCategory[] = [
  {
    id: "humanitarian-aid",
    label: "Humanitarian Aid",
    shortLabel: "Humanitarian Aid",
    href: "/projects?category=humanitarian-aid",
    dbCategories: ["Humanitarian Aid", "Clean Water", "Healthcare"],
    programSlugs: [
      "clean-water-project",
      "emergency-relief-fund",
      "food-bank",
      "free-medical-dispensary",
      "mobile-health-unit",
    ],
  },
  {
    id: "educational-skills",
    label: "Educational & Skills Development",
    shortLabel: "Education & Skills Development",
    href: "/projects?category=educational-skills",
    dbCategories: ["Education", "Education & Skills", "Educational & Skills Development"],
    programSlugs: [
      "computer-training-institute",
      "student-scholarship-breaking-barriers-building-futures",
    ],
  },
  {
    id: "social-welfare",
    label: "Social Welfare and Community Support",
    shortLabel: "Social Welfare & Community Support",
    href: "/projects?category=social-welfare",
    dbCategories: ["Social Welfare", "Social Welfare & Zakat", "Social Welfare and Community Support"],
    programSlugs: [
      "helping-hands-campaign",
      "new-beginnings-program",
      "orphan-support-project",
    ],
  },
  {
    id: "religious-giving",
    label: "Religious and Charitable Giving",
    shortLabel: "Religious Giving",
    href: "/projects?category=religious-giving",
    dbCategories: ["Religious Giving", "Religious and Charitable Giving"],
    programSlugs: [
      "collective-qurbani-project",
      "eid-gift-hampers",
      "fidyaa",
      "ramadan-hamper",
      "sadaqah-tul-fitr",
      "zakaat-fund",
    ],
  },
] as const;

/**
 * Normalizes a category query string to find the matching category definition.
 * Supports slugs (e.g. "humanitarian-aid", "educational-skills", "clean-water"),
 * raw DB names ("Humanitarian Aid", "Education"), and loose case-insensitive matches.
 */
export function resolvePKCategory(query: string | null | undefined): ProgramCategory | null {
  if (!query) return null;
  const clean = query.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "-");

  // 1. Direct ID match
  const byId = pkProgramCategories.find((c) => c.id === clean || c.id === query);
  if (byId) return byId;

  // 2. Match by clean slug aliases
  if (clean.includes("humanitarian") || clean.includes("water") || clean.includes("food") || clean.includes("relief") || clean.includes("health")) {
    return pkProgramCategories.find((c) => c.id === "humanitarian-aid") || null;
  }
  if (clean.includes("educat") || clean.includes("skill") || clean.includes("student") || clean.includes("scholarship") || clean.includes("computer")) {
    return pkProgramCategories.find((c) => c.id === "educational-skills") || null;
  }
  if (clean.includes("welfare") || clean.includes("wedding") || clean.includes("orphan") || clean.includes("social")) {
    return pkProgramCategories.find((c) => c.id === "social-welfare") || null;
  }
  if (clean.includes("religio") || clean.includes("zakat") || clean.includes("zakaat") || clean.includes("qurbani") || clean.includes("ramadan") || clean.includes("fitr") || clean.includes("fidya")) {
    return pkProgramCategories.find((c) => c.id === "religious-giving") || null;
  }

  // 3. Match against dbCategories
  for (const cat of pkProgramCategories) {
    if (cat.dbCategories.some((db) => db.toLowerCase() === query.toLowerCase())) {
      return cat;
    }
  }

  return null;
}
