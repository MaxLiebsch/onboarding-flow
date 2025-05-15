import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f1ff",
          100: "#d6e5ff",
          200: "#b5ceff",
          300: "#88adff",
          400: "#5a7cff",
          500: "#344dff",
          600: "#1119ff",
          700: "#080efa",
          800: "#0a11c9",
          900: "#131b9c",
          950: "#0b0e5b",
        },
        secondary: {
          50: "#f1f5ff",
          100: "#e5e9ff",
          200: "#ced7ff",
          300: "#a7b5ff",
          400: "#7686ff",
          500: "#3f4aff",
          600: "#1819ff",
          700: "#0709fa",
          800: "#0507d2",
          900: "#0607ac",
          950: "#000459",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
