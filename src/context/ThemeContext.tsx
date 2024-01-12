import { ReactNode, createContext, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleMode: () => {} });

interface ThemeProp {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProp) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  ); // theme라는 값이 없으면 light를 준다.

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
