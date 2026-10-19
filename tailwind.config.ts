import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        site: "var(--site-max-width, 1440px)",
      },
      screens: {
        xs: "420px",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Hind Siliguri"', "sans-serif"],
        bangla: ['"Hind Siliguri"', '"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        apple: {
          blue: "#007AFF",
          teal: "#30B0C7",
          cyan: "#32ADE6",
          indigo: "#5856D6",
          crimson: "#E11D48",
          green: "#34C759",
          amber: "#FF9500",
        },
      },
      animation: {
        "float-slow": "float 14s ease-in-out infinite",
        "float-delayed": "float 18s ease-in-out 4s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(25px, -30px) scale(1.06)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
