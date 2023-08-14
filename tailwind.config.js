/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  prefix: 'tw-',
  darkMode: ['class', '[data-mode="darken"]'],
  theme: {
    extend: {},
  },
  plugins: [],
}
