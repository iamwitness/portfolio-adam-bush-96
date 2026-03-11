import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "SF Mono", "monospace"],
        // legacy alias
        win95: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        win95: {
          bg: "#008080",
          chrome: "#C0C0C0",
          borderLight: "#DFDFDF",
          borderDark: "#808080",
          borderDarkest: "#404040",
          titlebar: "#000080",
          titlebarEnd: "#1084D0",
          titlebarInactive: "#808080",
          text: "#000000",
          textDisabled: "#808080",
          highlight: "#000080",
          highlightText: "#FFFFFF",
          windowBg: "#FFFFFF",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        raised:
          "0 1px 2px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.15)",
        pressed: "inset 0 2px 4px rgba(0,0,0,0.15)",
        window:
          "0 0 0 1px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.12), 0 12px 40px rgba(0,0,0,0.08)",
        inset: "inset 0 1px 3px rgba(0,0,0,0.12)",
      },
      transitionDuration: {
        fast: "100ms",
        normal: "150ms",
        smooth: "200ms",
      },
      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
      },
    },
  },
  plugins: [],
};

export default config;
