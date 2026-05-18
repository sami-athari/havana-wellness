import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        havana: {
          black: "var(--havana-black)",
          charcoal: "var(--havana-charcoal)",
          dark: "var(--havana-dark)",
          surface: "var(--havana-surface)",
          gold: "var(--havana-gold)",
          goldLight: "var(--havana-gold-light)",
          goldDark: "var(--havana-gold-dark)",
          cream: "var(--havana-cream)",
          ivory: "var(--havana-ivory)",
          white: "var(--havana-white)",
          teal: "var(--havana-teal)",
          poolBlue: "var(--havana-pool-blue)",
          spaRose: "var(--havana-spa-rose)",
          gymOrange: "var(--havana-gym-orange)",
          bbqAmber: "var(--havana-bbq-amber)",
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "0% 0%" },
          to: { backgroundPosition: "-200% 0%" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.98)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out both",
        fadeInUp: "fadeInUp 0.7s ease-out both",
        slideUp: "slideUp 0.7s ease-out both",
        shimmer: "shimmer 1.8s linear infinite",
        scaleIn: "scaleIn 0.5s ease-out both",
      },
    },
  },
  plugins: [require("tw-animate-css")],
};

export default config;
