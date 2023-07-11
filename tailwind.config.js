/** @type {import('tailwindcss').Config} */
import formKitTailwind from "@formkit/themes/tailwindcss";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./tailwind-theme.js"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          bizinix: '#111827',
        },
        bizinix: {
          border: '#006464'
        }
      }
    },
  },
  plugins: [
    formKitTailwind
  ],
};
