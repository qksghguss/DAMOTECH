import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1D4ED8",
          light: "#60A5FA",
          dark: "#1E3A8A"
        }
      }
    }
  },
  plugins: []
};

export default config;
