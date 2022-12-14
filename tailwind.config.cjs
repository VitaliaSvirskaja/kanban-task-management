/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#635FC7",
        "primary-light": "#A8A4FF",
        black: "#000112",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        red: "#EA5555",
        "red-light": "#FF9898",
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
