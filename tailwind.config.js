/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        caramel: ["Caramel", "cursive"],
        "great-vibes": ["Great Vibes", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        sage: {
          500: "#8C9B8B",
          600: "#7a8a7a",
        },
      },
      animation: {
        "bounce-custom": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
