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
      className="p-2 text-gray-800 dark:text-[#e2e8f0] hover:opacity-70 transition-opacity"
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
