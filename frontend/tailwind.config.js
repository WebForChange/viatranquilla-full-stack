/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      eggshell: {
        DEFAULT: "#f4f1de",
        100: "#463f17",
        200: "#8b7f2e",
        300: "#c5b651",
        400: "#dcd397",
        500: "#f4f1de",
        600: "#f6f3e3",
        700: "#f8f6ea",
        800: "#faf9f1",
        900: "#fdfcf8",
      },
      burnt_sienna: {
        DEFAULT: "#e07a5f",
        100: "#36140a",
        200: "#6c2715",
        300: "#a23b1f",
        400: "#d7502b",
        500: "#e07a5f",
        600: "#e79680",
        700: "#edb1a0",
        800: "#f3cbc0",
        900: "#f9e5df",
      },
      rose_taupe: {
        DEFAULT: "#8f5d5d",
        100: "#1c1313",
        200: "#392525",
        300: "#553838",
        400: "#724a4a",
        500: "#8f5d5d",
        600: "#a87a7a",
        700: "#be9b9b",
        800: "#d3bcbc",
        900: "#e9dede",
      },
      delft_blue: {
        DEFAULT: "#3d405b",
        100: "#0c0d12",
        200: "#181a25",
        300: "#252737",
        400: "#313349",
        500: "#3d405b",
        600: "#5a5e87",
        700: "#7e83a9",
        800: "#a9acc6",
        900: "#d4d6e2",
      },
      slate_gray: {
        DEFAULT: "#5f797b",
        100: "#131819",
        200: "#263132",
        300: "#39494a",
        400: "#4c6263",
        500: "#5f797b",
        600: "#7c989a",
        700: "#9cb2b3",
        800: "#bdcbcc",
        900: "#dee5e6",
      },
      cambridge_blue: {
        DEFAULT: "#81b29a",
        100: "#17261f",
        200: "#2f4c3e",
        300: "#46725d",
        400: "#5d987b",
        500: "#81b29a",
        600: "#9ac1ae",
        700: "#b3d0c2",
        800: "#cce0d7",
        900: "#e6efeb",
      },
      sage: {
        DEFAULT: "#babf95",
        100: "#292b1a",
        200: "#515533",
        300: "#7a804d",
        400: "#9fa66b",
        500: "#babf95",
        600: "#c9cdab",
        700: "#d6d9c0",
        800: "#e4e6d5",
        900: "#f1f2ea",
      },
      sunset: {
        DEFAULT: "#f2cc8f",
        100: "#442d08",
        200: "#895b10",
        300: "#cd8818",
        400: "#eaac48",
        500: "#f2cc8f",
        600: "#f4d5a4",
        700: "#f7e0bb",
        800: "#faead1",
        900: "#fcf5e8",
      },
      gray: {
        DEFAULT: "#333333",
        100: "#000000",
        200: "#000000",
        300: "#000000",
        400: "#000000",
        500: "#333333",
        600: "#5c5c5c",
        700: "#858585",
        800: "#aeaeae",
        900: "#d7d7d7",
      },
    },
    extend: {
      backgroundImage: {
        'hero-img': "url('./src/assets/vw-roadtrip.png')",
        '404': "url('./src/assets/404-bg.png')",
      }
    },
  },
  plugins: [require("daisyui")],
};
