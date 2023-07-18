/** @type {import('tailwindcss').Config} */
import formKitTailwind from "@formkit/themes/tailwindcss";
import { link } from "fs";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./tailwind-formkit-theme.js"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          bizinix: '#111827',
        },
        bizinix: {
          border: '#006464',
          teal: '#0d9488',
          link: '#14b8a6'
        }
      }
    },
  },
  plugins: [
    formKitTailwind
  ],
};
