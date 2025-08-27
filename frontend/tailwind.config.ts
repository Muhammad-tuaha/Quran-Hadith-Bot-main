import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Scheherazade New", "serif"],
      sans: ["Work Sans", "sans-serif"], // your Arabic font
      },
    },
  },
  plugins: [],
}

export default config
