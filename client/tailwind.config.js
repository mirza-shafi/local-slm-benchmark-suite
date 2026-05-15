/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Premium dark mode navy/blue palette
        dark: {
          bg: "#0f1419",        // Main background
          card: "#1a2332",      // Card background
          border: "#2a3a52",    // Borders
          hover: "#253347",     // Hover state
          text: "#e2e8f0",      // Primary text
          textSecondary: "#94a3b8", // Secondary text
          accent: "#3b82f6",    // Blue accent
        }
      },
    },
  },
  plugins: [],
}
