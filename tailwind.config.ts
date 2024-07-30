import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        gray: {
          50: "#F7F7FB",
          100: "#F1F1F5",
          200: "#E5E5EB",
          300: "#CCCCCC",
          400: "#BBBBBB",
          500: "#999999",
          600: "#767676",
          700: "#505050",
          800: "#333333",
          900: "#111111",
        },
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        mainGreen: "#2FA464",
        mainBlack: "#353C49",
        subGreen: "#E9FFF3",
        subBlack: "#E8F0FF",
        positive: "#21C389",
        negative: "#FF4D4D",
        kakaoYellow: "#F9DB00",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
