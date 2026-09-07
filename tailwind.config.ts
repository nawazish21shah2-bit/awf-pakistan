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
        foreground: "#1b2436",
        primary: {
          DEFAULT: "#1b2436",
          soft: "#2a354c",
        },
        accent: {
          DEFAULT: "#B10D13",
          deep: "#940a0e",
          soft: "#dc2626",
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
        soft: "0 18px 50px rgba(27, 36, 54, 0.08)",
        glow: "0 8px 30px rgba(177, 13, 19, 0.15)",
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
