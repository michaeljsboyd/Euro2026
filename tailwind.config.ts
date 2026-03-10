import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#efe8d9",
        ink: "#1f2430",
        mist: "#f6f4ef",
        olive: "#5f6b57",
        blush: "#d7b8a3",
        gold: "#bf9b63"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(31, 36, 48, 0.08)"
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at top left, rgba(215, 184, 163, 0.22), transparent 38%), radial-gradient(circle at top right, rgba(191, 155, 99, 0.2), transparent 32%), linear-gradient(180deg, #f7f2e7 0%, #f5f1ea 38%, #f0ece2 100%)"
      }
    }
  },
  plugins: []
};

export default config;

