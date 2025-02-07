import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ece7f5",
          100: "#CFC5E7",
          200: "#af9fd7",
          300: "#9078c8",
          400: "#785bbc",
          500: "#6040b0",
          600: "#573baa",
          700: "#4a33a1",
          800: "#3f2d98",
          900: "#2c2289",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
