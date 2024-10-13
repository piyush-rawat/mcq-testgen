/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      1: "Afacad Flux",
      2: "Montserrat",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // 1: "#16423C",
        // 2: "#6A9C89",
        // 3: "#C4DAD2",
        // 4: "#E9EFEC",


		// 1: "#433878",
        // 2: "#7E60BF",
        // 3: "#E4B1F0",
        // 4: "#FFE1FF",

		1: "#624E88",
        2: "#8967B3",
        3: "#CB80AB",
        4: "#E6D9A2",

      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
