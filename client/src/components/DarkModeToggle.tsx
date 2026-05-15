/**
 * Dark Mode Toggle Component
 */
import React from "react";
import { useTheme } from "../context/ThemeContext";

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-[#2a3a52] text-gray-800 dark:text-[#e2e8f0] hover:bg-gray-300 dark:hover:bg-[#3a4a62] transition-colors"
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <span className="text-lg">☀️</span>
      ) : (
        <span className="text-lg">🌙</span>
      )}
    </button>
  );
};
