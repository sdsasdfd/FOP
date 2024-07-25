/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: {
          blue: "#b0c4de",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
