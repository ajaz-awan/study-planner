import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? "#121212" : "#F5F5F5",
      card: isDark ? "#1E1E1E" : "#FFFFFF",
      text: isDark ? "#FFFFFF" : "#000000",
      subtext: isDark ? "#AAAAAA" : "#666666",
      primary: "#6C63FF",
      danger: "#FF4444",
      success: "#4CAF50",
      border: isDark ? "#333333" : "#E0E0E0",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);