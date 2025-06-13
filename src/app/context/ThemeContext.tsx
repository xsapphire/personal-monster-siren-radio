"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeContextType = {
  selectedTheme: Theme;
  updateSelectedTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme || Theme.DARK);
    }
  }, []);

  const updateSelectedTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ selectedTheme: theme, updateSelectedTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
