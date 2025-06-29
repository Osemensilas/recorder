/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)",
        btns: "var(--btns)",
        text: "var(--text)",
        silver: "var(--silver)",
        danger: "var(--danger)",
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
