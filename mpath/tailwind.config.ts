import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FB",
        primary: "#243B53",
        secondary: "#526D82",
        accent: "#A8B5A2",
        border: "#E5E7EB",
        card: "#FFFFFF",
        text: {
          DEFAULT: "#1F2937",
          muted: "#6B7280",
          light: "#9CA3AF",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(31, 41, 55, 0.08)",
        card: "0 10px 30px rgba(36, 59, 83, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
