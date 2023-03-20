const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["app/**/*.{js,jsx}", "components/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ["var(--font-sans)", ...fontFamily.sans],
  //     },
  //     keyframes: {
  //       "accordion-down": {
  //         from: { height: 0 },
  //         to: { height: "var(--radix-accordion-content-height)" },
  //       },
  //       "accordion-up": {
  //         from: { height: "var(--radix-accordion-content-height)" },
  //         to: { height: 0 },
  //       },
  //     },
  //     animation: {
  //       "accordion-down": "accordion-down 0.2s ease-out",
  //       "accordion-up": "accordion-up 0.2s ease-out",
  //     },
  //   },
  // },

  plugins: [require("tailwindcss-animate")],
};
