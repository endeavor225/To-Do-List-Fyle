/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Ajoutez les couleurs et opacités nécessaires
    "text-cyan-600",
    "bg-cyan-600/15",
    "text-purple-600",
    "bg-purple-600/15",
    "text-amber-600",
    "bg-amber-600/15",
    // Ajoutez d’autres combinaisons de couleurs au besoin
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
