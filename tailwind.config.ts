import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafbfc",
        foreground: "var(--color-primary)",
        primary: {
          DEFAULT: "var(--color-primary)",
          soft: "var(--color-primary-soft)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          deep: "var(--color-accent-deep)",
          soft: "var(--color-accent-soft)",
        },
        muted: "#374151",
        surface: {
          DEFAULT: "#f2f4f7",
          warm: "#eef1f5",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        urdu: ["var(--font-noto-urdu)", "Noto Nastaliq Urdu", "serif"],
      },
      boxShadow: {
        soft: "0 18px 50px color-mix(in srgb, var(--color-primary) 8%, transparent)",
        glow: "0 8px 30px color-mix(in srgb, var(--color-accent) 15%, transparent)",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
      }
    },
  },
  plugins: [],
};
export default config;
