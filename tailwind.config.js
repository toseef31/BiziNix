/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    //"./node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    //require('@formkit/themes/tailwindcss'),
    require('@tailwindcss/forms')
  ],
}
