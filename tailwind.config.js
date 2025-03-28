/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalblue: "#1D1275",
        noblered: "#BD0E23",
        crowngold: "#F2B50C",
        darkbg: "#171717",
        notsowhite: "#F7F7F7",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
