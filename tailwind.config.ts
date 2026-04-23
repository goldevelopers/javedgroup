import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#204253",
        teal: "#37B3A1",
        lime: "#92DA22",
        skyblue: "#00ADEE",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(32, 66, 83, 0.12)",
        hover: "0 30px 60px -12px rgba(55, 179, 161, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
