import { useState, useEffect } from "react";

export const useDarkTheme = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const isDarkTheme = localStorage.getItem("DARK_THEME");
    if (isDarkTheme) {
      setDarkTheme(JSON.parse(isDarkTheme));
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    localStorage.setItem("DARK_THEME", JSON.stringify(!darkTheme));
    setDarkTheme((prev) => !prev);
  };

  return [darkTheme, toggleTheme] as const;
};
