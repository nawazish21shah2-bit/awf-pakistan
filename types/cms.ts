export type Program = {
  id: string;
  site_id: string | null;
  slug: string;
  nav_label: string;
  category: string;
  title: string;
  image_url: string | null;
  featured_image_url?: string | null;
  summary: string[] | string;
  body?: {
    content?: string[];
    contentHtml?: string;
    gallery?: Array<{ image_url: string; caption?: string }> | string[];
    tags?: string[];
    status_badge?: string;
  };
  donate_link?: string | null;
  status: "draft" | "published";
  sort_order: number;
};

export type AchievementCounter = {
  id: string;
  site_id: string | null;
  key: string;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  placement: string;
  image_url: string | null;
  description: string | null;
  status: "draft" | "published";
  sort_order: number;
};

export type TeamMember = {
  id: string;
  site_id: string | null;
  slug: string;
  name: string;
  role: string;
  bio: string;
  bioHtml?: string;
  image_url: string | null;
  status: "draft" | "published";
  sort_order: number;
};

export type FaqCategory = {
  id: string;
  site_id: string | null;
  code: string;
  label: string;
  sort_order: number;
  status: "draft" | "published";
};

export type FaqItem = {
  id: string;
  site_id: string | null;
  category_id: string | null;
  category_label?: string;
  question: string;
  answer: string;
  answerHtml?: string;
  placement: string;
  status: "draft" | "published";
  sort_order: number;
};

export type Report = {
  id: string;
  site_id: string | null;
  year: string;
  report_type: string;
  title: string;
  cover_image_url: string | null;
  pdf_url: string | null;
  external_url: string | null;
  description: string | null;
  status: "draft" | "published";
  sort_order: number;
};

export type Post = {
  id: string;
  site_id: string | null;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string | null;
  image_url: string | null;
  image_asset_id?: string | null;
  body?: {
    body?: string[];
    bodyHtml?: string;
    tags?: string[];
    quote?: string;
    bullets?: string[];
    heading?: string;
    opening?: string[];
    headingText?: string;
  };
  tags?: string[];
  seo_title?: string | null;
  seo_description?: string | null;
  status: "draft" | "published";
  sort_order: number;
};

