/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        "great-vibes": ["Great Vibes", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        bdscript: ["BDScript", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#b8a472",
          light: "#d4c89a",
          dark: "#9a8a5e",
        },
        cream: "#faf9f6",
      },
      animation: {
        "bounce-custom": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
