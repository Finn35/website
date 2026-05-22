import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        canvas: "#FAFAF9",        // off-white background
        surface: "#FFFFFF",       // pure white card surfaces
        paper: "#F4F4F2",         // alternating section background
        featured: "#F5F0EB",      // warm off-white for featured pricing card
        cream: "#F7F3EE",         // contact form / modal background
        selected: "#FDF5F6",      // selected radio-card background (light burgundy tint)
        line: "#E6E5E1",          // subtle borders
        ink: {
          DEFAULT: "#18181B",
          900: "#0B0B0D",
          800: "#27272A",
          700: "#3F3F46",
          500: "#71717A",
          400: "#A1A1AA",
        },
        // Primary brand color: deep burgundy. Used on CTAs and the featured pricing border.
        burgundy: {
          DEFAULT: "#4A1825",
          50: "#FBF2F4",
          100: "#F2DCE2",
          200: "#E3B5BF",
          300: "#C97D8E",
          400: "#9C3F55",
          500: "#7A2A3D",
          600: "#4A1825",
          700: "#3B121D",
          800: "#2A0D15",
        },
        // Accent: warm gold. Used ONLY for italic emphasis text + stars.
        gold: {
          DEFAULT: "#C9A96E",
          50: "#FAF6EE",
          100: "#F2E8D2",
          200: "#E5D2A5",
          300: "#D7BB85",
          400: "#C9A96E",
          500: "#B58F4F",
          600: "#8E6E3C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: [
          "var(--font-sans)",
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.5rem, 5vw + 1rem, 4.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.022em" },
        ],
        "display-lg": [
          "clamp(2rem, 3vw + 1rem, 3.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.018em" },
        ],
        "display-md": [
          "clamp(1.5rem, 1.5vw + 1rem, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.012em" },
        ],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      borderRadius: {
        button: "0.625rem",      // 10px — consistent CTA shape
      },
      boxShadow: {
        card: "0 1px 0 rgba(24,24,27,0.02), 0 18px 40px -28px rgba(24,24,27,0.18)",
        "card-hover":
          "0 1px 0 rgba(24,24,27,0.03), 0 30px 60px -28px rgba(24,24,27,0.22)",
        mockup:
          "0 30px 80px -32px rgba(24,24,27,0.28), 0 6px 20px -8px rgba(24,24,27,0.08)",
        burgundy:
          "0 1px 0 rgba(74,24,37,0.06), 0 22px 50px -24px rgba(74,24,37,0.35)",
        "burgundy-hover":
          "0 1px 0 rgba(74,24,37,0.08), 0 30px 70px -28px rgba(74,24,37,0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "ping-slow": "pingSlow 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pingSlow: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
