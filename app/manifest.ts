import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arrahman Welfare Foundation Pakistan",
    short_name: "AWF Pakistan",
    description:
      "Zakat-eligible humanitarian aid, food packages, student scholarships, and clean water in Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafbfc",
    theme_color: "#B10D13",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
