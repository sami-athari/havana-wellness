import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        gold: "#C9A84C",
        "gold-hover": "#B8952F",
        "gold-light": "#E8D49A",
        "havana-bg": "#F8F7F4",
        "havana-surface": "#F2F0EC",
        "havana-text": "#111111",
        "havana-muted": "#999999",
        "havana-border": "#E5E2DC",
        pool: "#0EA5E9",
        spa: "#F43F5E",
        gym: "#F97316",
        bbq: "#D97706",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
    },
  },
  plugins: [require("tw-animate-css")],
};

export default config;
