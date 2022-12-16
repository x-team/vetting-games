/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      teko: ["Teko", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      incosolata: ["Inconsolata", "monospace"],
      code: ["Source Code Pro", "monospace"],
    },
    colors: {
      neutral: {
        200: "#DCDFEB",
        400: "#77758A",
        700: "#272424",
        800: "#1D1E22",
        900: "#1C1515",
      },
      ecru: {
        200: "#FDF2D3",
        300: "#F4E4B8",
      },
      green: {
        200: "#D4F7D5",
        600: "#28A284",
      },
      red: {
        200: "#F7E5D4",
        600: "#D72D44",
      },
      blue: {
        200: "#D4EAF6",
        600: "#5D47CA",
        800: "#4C37B4",
      },
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({
        ".text-snippet": {
          "@apply font-incosolata text-sm leading-4": {},
        },
        ".text-xsmall": {
          "@apply font-inter text-xs leading-4 tracking-tight": {},
        },
        ".text-xsmall-bold": {
          "@apply font-inter text-xs font-bold leading-4 tracking-tight": {},
        },
        ".text-small": {
          "@apply font-inter text-sm leading-5 tracking-tight": {},
        },
        ".text-small-bold": {
          "@apply font-inter text-sm font-bold leading-5 tracking-tight": {},
        },
        ".text-medium": {
          "@apply font-teko text-sm font-bold uppercase leading-none tracking-wide":
            {},
        },
        ".text-large": {
          "@apply font-teko text-xl font-bold uppercase leading-none tracking-wide":
            {},
        },
        ".text-xlarge": {
          "@apply font-teko text-4xl uppercase leading-none tracking-tight": {},
        },
        ".text-xxlarge": {
          "@apply font-teko text-6xl uppercase leading-none tracking-tight": {},
        },
      });
    },
    require("tailwind-scrollbar"),
  ],
};
