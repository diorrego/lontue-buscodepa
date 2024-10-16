/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        qrWokuLanding: "url('/qrWokuLanding.png')",
      },
    },
    fontFamily: {
      sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
