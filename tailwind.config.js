/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        input: "var(--input)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        // add more CSS vars if needed
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
