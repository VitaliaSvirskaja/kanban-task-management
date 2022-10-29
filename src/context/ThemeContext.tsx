import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContext {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

const themeContext = createContext<ThemeContext>({
  isThemeDark: false,
  toggleTheme: () => undefined,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isThemeDark, setIsThemeDark] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    localStorage.theme = isThemeDark ? "dark" : "light";
    if (isThemeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isThemeDark]);

  function handleToggle() {
    setIsThemeDark(!isThemeDark);
  }

  return (
    <themeContext.Provider
      value={{
        isThemeDark: isThemeDark,
        toggleTheme: handleToggle,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export function useThemeContext() {
  return useContext(themeContext);
}
